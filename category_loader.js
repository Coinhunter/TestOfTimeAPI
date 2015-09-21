var categoryHandler = require('./lib/handlers/category-handler.js'),
	config = require('config'),
	mongoose = require('mongoose'),
	CategoryModel = require('./lib/models/categories.js'),
	db = require('./lib/db.js'),
	fs = require("fs");	

var json = fs.readFileSync('./res/categories.json');
var categoriesArray = JSON.parse(json);


db.connect(function(err) {
	if (err) {
		console.log('Error connecting to database');
		process.exit(1);
	}
	
	categoriesArray.forEach(function(category) {
		var params = {};
		params.category = category.categoryname;
		categoryHandler.add(null, params, function(error, result) {
			if (error) {
				console.log(error);
			} else {
				console.log(result);
			}
		});
	});
});