
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