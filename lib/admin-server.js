'use strict';

var server,
	app,
	path_join = require('path').join,
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
	errorHandler = require('errorhandler');

/**
 * Starts server.
 */
exports.startServer = startServer;

/**
 * Stop server.
 */
exports.stopServer = stopServer;

function startServer(callback) {
	app = express();

	app.set('port', process.env.PORT || Config.admin.port);
	app.set('view engine', 'jade');
	app.locals.pretty = true;

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(methodOverride());
	app.use(cookieParser());
	app.use(logger('dev'));
	app.use(session({
		secret: Config.secrets.cookie,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true }
	}));

	//TODO: FIX THIS! I have a feeling we're going to need browserify.
	//app.get('/js/admin.js', browserify('./browser/main.js')); 

	app.use(less_middleware({
		compress: true,
		src: path_join(__dirname, '..', '/less'),
		prefix: '/css',
		dest: path_join(__dirname, '..', '/public/css')
	}));

	app.use(serveStatic(path_join(__dirname, '../public')));
	app.use(errorHandler());

	app.get('/', function(req, res){
	  res.send('hello world');
	});

	server = http.createServer(app);
	server.listen(app.get('port'), function() {
  		console.log('TestOfTime server listening on port ' + app.get('port'));
	});
}

function stopServer(callback) {

}