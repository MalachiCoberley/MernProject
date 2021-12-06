//import Mongoose
const mongoose = require('mongoose')
//start express
const express = require("express");
const app = express();
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

//---ROUTES
app.use("/api/users", users);
app.use("/api/tweets", tweets);

//---MIDDLEWARE
//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//passport
app.use(passport.initialize());
require('./config/passport')(passport);

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