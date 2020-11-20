// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const port = parseInt(process.env.PORT) || 3000;

// listen for requests :)
app.listen(port,()=> console.log(`Listening on port ${port}`));

// make all the files in 'public' available
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});


