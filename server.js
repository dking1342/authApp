  
const express = require('express');


// app and routes init
const app = express();
const { router } = require('./routes/routes');


// views engine init
app.set('view engine', 'ejs');

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(router);



// server init
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
