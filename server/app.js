import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import morgan from "morgan";
import hbs from "express-handlebars";
import { router } from "./routes/index.js";
import passport from "passport";
import session from "express-session";
import GooglePassport from "./config/passport.js";
import { authRouter } from "./routes/auth.js";
import MongoStore from "connect-mongo";
import methodOverride from "method-override";
import { storyRouter } from "./routes/stories.js";
import { formatDate, stripTags,truncate,editIcon,select } from "./helpers/hbs.js";

// dotenv config
dotenv.config({ path: "./config/config.env" });

// passport config
GooglePassport(passport);

// db setup
connectDB();

// middleware init
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
);

// morgan logging
if(process.env.NODE_ENV === "development"){
  app.use(morgan("dev"));
}

// handlebars setup
app.engine(
  ".handlebars", 
  hbs.engine({
    helpers:{
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    defaultLayout:"main",
    extname:".handlebars"
  })
);
app.set("view engine", ".handlebars");
app.set('views', './views');

// express session middleware
app.use(session({
  secret:process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl:process.env.MONGO_URI
  })
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set global var
app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})

// static folder
app.use(express.static("public"));

// routes setup
app.use("/", router);
app.use("/auth", authRouter);
app.use("/stories", storyRouter);

// server init
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server listening in ${process.env.NODE_ENV} mode on ${PORT}`));