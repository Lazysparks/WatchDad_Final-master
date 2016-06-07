'use strict';

var User = require('mongoose').model('User'),
	passport = require('passport'),
	mailer = require('../../config/mailer');

var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Gebruikersnaam bestaat al';
				break;
			default:
				message = 'Server werkt niet';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

exports.renderSignin = function(req, res, next) {
	if (!req.user) {
		res.render('signin', {
			title: 'Sign-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/');
	}
};

exports.renderSignup = function(req, res, next) {
	if (!req.user) {
		res.render('signup', {
			title: 'Sign-up Form',
			messages: req.flash('error')
		});
	} else {
		return res.redirect('/');
	}
};

exports.signup = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body);
		var message = null;

		user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/signup');
			}

			req.login(user, function(err) {
				if (err) return next(err);
				mailer.sendRegistrationMail(user);
				
				return res.redirect('/');
			});
		});
	} else {
		return res.redirect('/');
	}
};

exports.signout = function(req, res) {
	req.logout();

	res.redirect('/');
};