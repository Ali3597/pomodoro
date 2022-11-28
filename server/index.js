const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || '8000';
const router = require('./routes');

require('./database');

const app = express();

module.exports = {
  app,
};



app.use(express.static('../client-build'));
app.use(express.json());
app.use(cookieParser());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

require("./config/jwt.config");

app.use(router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client-build/index.html'));
})

app.listen(port);