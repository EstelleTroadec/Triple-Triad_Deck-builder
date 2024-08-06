const dotenv = require('dotenv');
const express = require('express');
dotenv.config();

const router = require('./app/router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));

// import the express-session module
const session = require('express-session');
app.use(session( 
  {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }
));

// "home made" middleware
app.use((req, res, next) => {
  // if the deck property of the session is undefined, set it to an empty array
  if (!req.session.deck) {
    req.session.deck = [];
  }
  // otherwise, just move on to the next middleware
  next();
  
})






app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
