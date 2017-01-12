var express = require('express');
var passport = require('passport');
var bCrypt = require('bcrypt-nodejs');
var router = express.Router();



var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = function(passport){

	router.get('/', function(req, res) {
		res.render('login', { message: req.flash('message') });
	});

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/index',
		failureRedirect: '/',
		failureFlash : true
	}));

	router.get('/signup', isAuthenticated, function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/index',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	router.get('/index', isAuthenticated, function(req, res){
		res.render('index', { user: req.user });
	});

	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

    return router;
}
