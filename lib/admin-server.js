'use strict';

var server,
	app,
	express = require('express'),
	mongoose = require('mongoose'),
	Config = require('config'),
	passport = require('passport'),
	path_join = require('path').join,	
	setupPassport = require('./passport/setup.js');

/*
	
	express = require('express'),
	mongoose = require('mongoose'),
	less_middleware = require('less-middleware'),
	Config = require('config'),
	browserify = require('browserify-middleware'),
	http = require('http'),
	methodOverride = require('method-override'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	logger = require('morgan'),
	session = require('express-session'),
	serveStatic = require('serve-static'),
	errorHandler = require('errorhandler'),
	setupPassport = require('./passport/setup.js');

*/	

/**
 * Starts server.
 */
exports.startServer = startServer;

function startServer(callback) {
	app = express();
	
	// Configure view engine to render EJS templates.
	app.set('views', path_join(__dirname, '../views'));
	app.set('view engine', 'jade');
	app.set('port', process.env.PORT || 8080);

	// Use application-level middleware for common functionality, including
	// logging, parsing, and session handling.
	app.use(require('morgan')('combined'));
	app.use(require('cookie-parser')());
	app.use(require('body-parser').urlencoded({ extended: true }));
	app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

	// Initialize Passport and restore authentication state, if any, from the
	// session.
	setupPassport(app);
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.static(path_join(__dirname, '../public')));

	// Define routes.
	app.get('/',
	  function(req, res) {
	    res.render('home', { user: req.user });
	});

	app.get('/login',
	  function(req, res){
	    res.render('login');
	});
	  
	app.post('/login', 
	  passport.authenticate('local', { failureRedirect: '/login' }),
	  function(req, res) {
	    res.redirect('/');
	});

	app.get('/logout',
	  function(req, res){
	    req.logout();
	    res.redirect('/');
	});

	app.get('/profile',
	  require('connect-ensure-login').ensureLoggedIn(),
	  function(req, res){
	    res.render('profile', { user: req.user });
	});	

	app.listen(app.get('port'), function(){
	  console.log('TestOfTime server listening on port ' + app.get('port'));
	});
}

