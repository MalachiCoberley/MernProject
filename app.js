//import Mongoose
const mongoose = require('mongoose')
//start express
const express = require("express");
const app = express();

//sets the basic route
app.get("/", (req, res) => res.send("Hello World"));

//connect to MongoDB
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

//starts the port for heroku and localhost 5000
const port = process.env.PORT || 5000;
//starts the socket and listens for connections
app.listen(port, () => console.log(`Server is running on port ${port}`));