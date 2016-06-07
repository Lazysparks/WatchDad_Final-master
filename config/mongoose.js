'use strict';

var	config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);
	
	// Models  
	require('../app/models/user.server.model.js');

	return db;
};