'use strict';

var settings = require('../controllers/settings.server.controller.js'),
    passport = require('passport');

module.exports = function(app) {
    app.get('/settings', settings.renderSettingsPage);
};