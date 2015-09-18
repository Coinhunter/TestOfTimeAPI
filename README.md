# TestOfTime API

## Purpose

TestOfTime is a game where the player is supposed to organize historical events in chronological order.

## Install Instructions

To run this API you have to have Node installed. Compatible with 4.1.0 and up.

	$ npm install

You also have to be running MongoDB locally:
	
	$ sudo mongod

In order to make calls to the API basic authentication is required. To set up a user with username: `testoftime@time.now` and password: `password` run setup_user.js. This means that the headers should include one `Authorization` entry with value `Basic dGVzdG9mdGltZUB0aW1lLm5vdzpwYXNzd29yZA==`. It also needs to have a `Content-Type` header with `application/json` to work. Note: This is only to set up a user with which to play around.
	
	$ node setup_user.js

To start the server:

	$ node server.js


## API Documentation

