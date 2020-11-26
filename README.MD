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
