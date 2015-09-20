# Test of Time API

## Purpose

TestOfTime is a game where the player is supposed to organize historical events in chronological order.

## Install Instructions

To run this API you have to have Node installed. Compatible with 4.1.0 and up.

	$ npm install

You also have to be running MongoDB locally:
	
	$ sudo mongod

In order to make calls to the API basic authentication is required. To create a user with username: `testoftime@time.now` and password: `password` run create_user.js. This means that the headers should include one `Authorization` entry with value `Basic dGVzdG9mdGltZUB0aW1lLm5vdzpwYXNzd29yZA==`. It also needs to have a `Content-Type` header with `application/json` to work. Note: This is only to set up a user with which to play around.
	
	$ node create_user.js

To populate the database with some initial cards to use:

	$ node card_loader.js

This uses the cards.json file in the res folder. Make sure that the data is proper json encoded by running through this: http://jsonlint.com/ 

To start the server:

	$ node server.js


## API Endpoints
#### GET  [ / ]
Returns an empty object. Authentication is not required for this. Use this to see if the service is up.

### Users
#### GET  [ /users ]
Returns array of existing users.

#### POST [ /users ]
Create new user. Example request body (all fields are required).

```json 
{
	"id": "userid",
	"name": "name of user",
	"email": "testoftime@time.now",
	"password": "password"
}
```
### Cards
#### POST [ /cards ]
Create new card. Example request body (all fields are required).

```json 
{
	"question": "Question that has a year as answer",
	"year": 1492
}
```

#### GET  [ /cards]
Get the first 100 cards, assuming that you have 100 cards.

