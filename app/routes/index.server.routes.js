// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function(app) {
	// Load the 'index' controller
	var index = require('../controllers/index.controller.js');

	// Mount the 'index' controller's 'render' method
	app.get('/', index.render);
};