'use strict';

var profiles = require('../controllers/profiles.controller.js'),
    passport = require('passport');

module.exports = function(app) {
    app.route('/profile')
        .get(profiles.renderProfilesPage);
    
    app.route('/profile/:profileId')
        .get(profiles.renderProfile);
};