'use strict';

var server,
	app,
	express = require('express'),
	mongoose = require('mongoose'),
	config = require('config'),
	passport = require('passport'),
	path_join = require('path').join,	
	setupPassport = require('./passport/setup.js');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore(
	{ 
		uri: config.mongo.sessionstore,
		collection: 'totsession'
	}, function(error){
		if(typeof error !== 'undefined') {
			console.log('Constructor ERROR: ' + JSON.stringify(error));
		}
	});

	// Catch errors 
	store.on('error', function(error) {
		console.log('Store.on ERROR: ' + JSON.stringify(error));
		assert.ifError(error);
		assert.ok(false);
	});

/**
 * Starts server.
 */
exports.startServer = startServer;

function startServer(callback) {
	app = express();
	
	// configure view engine to render EJS templates.
	app.set('views', path_join(__dirname, '../views'));
	app.set('view engine', 'jade');
	app.set('port', process.env.PORT || 8080);

	// Use application-level middleware for common functionality, including
	// logging, parsing, and session handling.
	app.use(require('morgan')('combined'));
	app.use(require('cookie-parser')());
	app.use(require('body-parser').urlencoded({ extended: true }));
	app.use(session({
		secret: config.secrets.cookieSecret,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
		},
		store: store,
		resave: false,
		saveUninitialized: false
	}));

	// Initialize Passport and restore authentication state, if any, from the
	// session.
	setupPassport(app);
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.static(path_join(__dirname, '../public')));

	app.use(function(req, res, next){
	  res.locals.user = req.user;
	  next();
	});	

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

  	// Setup routes
  	require('./routes/admin-router.js')(app);

	app.listen(app.get('port'), function(){
	  console.log('TestOfTime server listening on port ' + app.get('port'));
	});
}

