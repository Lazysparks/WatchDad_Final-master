'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var mongoose = require('./config/mongoose')(),
    express = require('./config/express'),
    passport = require('./config/passport')();

var app = express();

app.listen(3000, function () {
    console.log('Server running at http://localhost:3000/');
    require('./config/notifier');
});


module.exports = app;