<h1>NodeJS App using PassportJS (local-strategy)</h1>
<h2>Prerequisites</h2>
<a href="http://www.passportjs.org/">PassportJS</a></br>
<a href="https://nodejs.org/en/">NodeJS</a></br>
<a href="https://expressjs.com/">Express</a></br>
<a href="https://mongoosejs.com/">Mongoose</a></br>
<a href="https://www.mongodb.com/">MongoDB</a></br>
<a href="https://ejs.co/">EJS</a></br>
<h2>Introduction</h2>
<p>
The goal of this repo is to demonstrate how an web application with PassportJS, using the local-strategy, can be made and used.
Authentication amongst web applications and websites is an important aspect of how users can attain access and use the many features an app or site have to offer. Typical methods of registering a user and asking them to login to the app or site is mandatory. The problem is that if an app is not setup properly the authentication process can be tedious and prone to security mishaps. PassportJS is a great framework to streamline the process of authenticating a user and ensuring that the user has a good user experience whilst using the app or site. 
</p>
<p>
This repo provides and example in how to setup a NodeJS application wherein PassportJS can be added for authentication purposes. The repo also uses the MVC methodology and integrates PassportJS into the flow from user to server to database and back to the user.
</p>


<h2>Getting Started</h2>
<p>
Follow the instructions below:
</p>

```
$mkdir demo
$cd demo
$git clone https://github.com/dking1342/authApp.git
```

<p>
Next use npm to install all the dependencies
</p>

```
$npm install
```

<p>
In order for this application to work properly, then you need to have installed MongoDB and the MongoDB server running. This project will be creating the database on your local computer. For more information on how to install MongoDB and get a server up and running then please refer to the MongoDB website. The link is in the prerequisites section.
</p>

<p>
To confirm the application is working properly, first start the server (preferably with nodemon with the <code>server.js</code> file) and for start the MongoDB server. Once these servers are up and running then go to your browser and type <code>http://localhost:3000</code> and press enter. If nodemon shows that a different port is being used then go back to your browser and type in that port number
</p>
<h2>Project Setup</h2>
<h3>Methodology</h3>
As mentioned, this project uses the MVC (model-view-controller) methodology. To recap, the MVC takes in the input from the browser which results in a route. The route is found by the controller wherein the controller will doubly request/respond to the model and also the view. The model will return any data required and combine that with the view. The controller will then provide this route back to the browser for the user to carry on.
</p>
<img src="https://www.bogotobogo.com/RubyOnRails/images/MVC/MVC_Rails.png"/>
<h3>Folders and Files</h3>
<h4>Server File</h4>
<p>
  The <code>server.js</code> file in the root directory is where we will begin. It has the imports for the npm packages listed in the <code>package.json</code> file. It will include some standard middleware for parsing, etc. The middleware specific for this project relates to connect-mongo and PassportJS. Here you will make a new mongostore that will go to your database to create a new session or find an existing session. The PassportJS middlware here is coming from <code>passport.js</code> in the config folder. The rest of the middleware before the routes is a custom checker to restrict or allow access to routes when a user is authenticated or not authenticated via PassportJS.
</p>
<h4>Routes & Controller</h4>
<p>
In the routes folder you will see <code>routes.js</code> which documents all the routes possible in this app. The function being invoked in each route is found in the controllers folder. 
</p>
<p>
  The <code>userController.js</code> file details each function and describes what it is meant to do and the route it is assigned to.  Here is an example of one such function:
  
  ```
  // @des     Gets the homepage view
  // @route   GET /
  const getHomepage = (req,res) => {
    let user = req.isAuthenticated();
    res.render('index',{user});
    res.end();
  }
  ```
  
  As you will notice, the function will render a template with some data. The views are made with EJS and the data is coming from the models folder. As seen, the <code>user</code> variable is used to authenticate a user and output a boolean. This is neccessary for the navbar used in each view. The incoming data will help determine whether or not the authenticated navbar is used or not.
</p>
<h4>Models & Database Config</h4>
<p>
  The modesl folder only has one file which is <code>userModel.js</code>. In this file, it imports the configuration done with the MongoDB server. The <code>usersdb.js</code> file completes this configuration as seen below:
  
  ```
  const mongoose = require('mongoose');
  const { Schema } = require('mongoose');
  require('dotenv').config();

  // mongoose server init
  const conn = process.env.DB_STRING;
  const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
  };

  // connection
  const connection = mongoose.createConnection(conn,options);

  // schema
  const UserSchema = new Schema({
      username: String,
      hash: String,
      salt:String,
  });

  // model
  const User = connection.model('User',UserSchema);

  // export connection
  module.exports = {
      connection
  };
  ```
  
As seen in this code block, the schema has a username (which will eventually be used in the PassportJS config file), hash and salt. The hash and salt fields are part of the encryption methodology used by the npm package <code>crypto</code>.  
</p>
<p>
  Once the model has access to the MongoDB database, it will insert new users that register with the app. The function that creates a new user into the database also has a bit of regex validation to ensure the username and password meet the desired criteria as seen below:
  
  ```
        let usernameRegex = /^[a-z][^\W_]{4,14}$/i;
        let passwordRegex = /^(?=[^a-z]*[a-z])(?=\D*\d)[^:&.~\s]{5,20}$/;

        // ****Explanation for username regex
        // [a-z]    the first letter
        // [^\W_]   equivalent to [a-zA-Z0-9]

        // ****Explanation for password regex
        // (?=..)    is a lookahead that don't consume characters but only check
        // (?=[^a-z]*[a-z]) check if there is at least 1 lower case letter 
        // (?=\D*\d)   check if there is at least 1 digit
        // [^:&.~\s]  a character class that exclude all the characters you don't want
  ```

</p>
<h4>Views</h4>
<p>
  The view folder contains the views that are available in this app. These views were made using EJS. The most notable dynamic content is the navbar which is determined as mentioned above. The navbar will be different whether or not the user is authenticated or not.
  
  ```
      <% if(!user) { %>
        <nav>
          <a href="/">Home</a>
          <a href="/register">Register</a>
          <a href="/login">Login</a>
        </nav>
      <% } else { %>
        <nav>
          <a href="/landing">Landing</a>
          <a href="/about">About</a>
          <a href="/strategies">Strategies</a>
          <a href="/logout">Logout</a>
        </nav>        
      <% } %>
  ```

</p>
<p>
Apart from traditional types of views, there is a 404 view for routes not mentioned in the <code>routes.js</code> file. It also has a <code>/register-failure</code> and <code>/login-failure</code> when a user is rejected on either of those forms with the register or login view.
</p>
<p>
The public folder contains the styles and scripts for the front end. The front end has no such javascript file, it only has css files for a simple stying of each view.
</p>
<h4>Passport & Crypto<h4>
<p>
According to Passport's documentation, 
</p>
<cite>
Passport is authentication middleware for Node. It is designed to serve a singular purpose: authenticate requests. When writing modules, encapsulation is a virtue, so Passport delegates all other functionality to the application. This separation of concerns keeps code clean and maintainable, and makes Passport extremely easy to integrate into an application.
<cite>
<p>  
It includes many different strategies to authenticate. In this app, we use the local-strategy strategy. This strategy is used for username and password.  
</p>
<p>
  In the config folder there is a file called <code>passport.js</code> which contains the configuration needed. The code block is seen in the Passport documentation and already has it being used for a MongoDB database.
</p>
<p>
Passport takes in a username and password. However, the username and password are passed through a file in the utils folder called <code>usersUtil.js</code>. In this file the username and password as passed through some functions that utilize the crypto package making it suitable for being encrypted.
  </p>
  
  ```
  const crypto = require('crypto');

  const genPassword = (password) => {
    const salt = crypto.randomBytes(32).toString("hex");
    const genHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");
    return {
      salt: salt,
      hash: genHash,
    };
    }

    const validPassword = (password, hash, salt) => {
      const hashVerify = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");
      return hash === hashVerify;
    };

  ```
  
 <h2>Conclusion</h2>
 <p>
 This repo has demonstrated how you can build an NodeJS app using the local-strategy offered by PassportJS to authenticate users of your app or website. There are some moving parts, but overall it accomplishes the goal. Please feel free to navigate around the app to see how the final product.
 </p>
