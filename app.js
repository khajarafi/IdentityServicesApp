'use strict'
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
//let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let ejs = require('ejs')
let logger = require('./logger')
let notFoundLogger = require('./notFoundLogger')
let errorLogger = require('./errorLogger')
//let loginUser = express();
let flash = require('connect-flash');
let session = require('express-session');
let fs = require('fs');

//let mongoConfig = require('./mongodb/Connections')
let userSignup = require('./routes/userSignup')
let messages=require('./routes/messages')
let userLogin=require('./routes/userLogin')
let app = express();

let logDirectory = path.join(__dirname, 'log')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
//app.engine('html', ejs.renderFile)

const cors = require('cors')
app.use(cors())

const fileUpload = require('express-fileupload')
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'shhsecret', resave: true, saveUninitialized: true }));
app.use('/rest/userSignup', userSignup);
app.use('/rest/message',messages);
app.use('/rest/userLogin',userLogin)
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});
process.on('uncaughtException', function (err) {
  errorLogger.error(err.stack);
});


module.exports = app
