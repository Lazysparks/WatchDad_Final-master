'use strict';

var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	flash = require('connect-flash'),
	path = require('path'),
	exphbs = require('express-handlebars'),
	passport = require('passport');

module.exports = function() {
	var app = express();

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));


	app.engine('handlebars', exphbs(
		{
			extname: '.handlebars',
			defaultLayout: 'main',
			layoutsDir: path.join(__dirname + '/../app/views/layouts'),
			partialsDir: path.join(__dirname + '/../app/views/partials')
		}));
	app.set('views', path.join(__dirname + '/../app/views'));
	app.set('view engine', 'handlebars');

	// Configure the flash messages middleware
	app.use(flash());

	// Configure the Passport middleware
	app.use(passport.initialize());
	app.use(passport.session());

	// Load the routing files
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/profiles.server.routes')(app);

	// Configure static file serving
	app.use(express.static('./public'));

	// Return the Express application instance
	return app;
};