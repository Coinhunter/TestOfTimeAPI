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

This uses the cards.json file in the res folder. If you have edited the file make sure that the data file is proper json encoded by running through this: http://jsonlint.com/ 

To set up the database with some initial categories:

	$ node category_loader.js

This uses the categories.json file in the res folder. If you have edited the file make sure that the data file is proper json encoded by running through this: http://jsonlint.com/	

To start the server:

	$ node server.js


## API Endpoints

#### GET  [ / ]
Returns an empty object. Authentication is not required for this. Use this to see if the service is up.
```json 
{ }
```

### Users

#### GET  [ /users ]
Returns array of existing users. Example response:
```json 
[
	{
		"_id" : "55f9daef438d6e46412a5cea",
		"id" : "TestOfTimeAdmin",
		"created_at" : "2015-09-16T21:11:11.582Z",
		"email" : "testoftime@time.now",
		"updated_at" : "2015-09-16T21:11:11.583Z",
		"name" : "Timetester Testytest"
	},
	{
		"_id" : "55fabf0b9c98f8564a88a414",
		"id" : "NamesonID",
		"created_at" : "2015-09-17T13:24:27.309Z",
		"email" : "namenameson@email.com",
		"updated_at" : "2015-09-17T13:24:27.309Z",
		"name" : "Name Nameson"
	}
]
```

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
Create new card. Sample request body:
```json 
{
	"question": "Columbus reaches the new world - landing on an island in the Bahamas archipelago that he named 'San Salvador'.",
	"year": 1492,
	"category": "Exploration"
}
```

#### GET  [ /cards ]
Get a sample of the first 100 cards. Sample response:
```json 
[
	{
		"_id" : "55ff11b07b5803b920988b6c",
		"category" : "Other",
		"question" : "Julius Ceasar becomes emperor of the Roman Republic",
		"year" : -49
	},
	{
		"_id" : "55ff11b07b5803b920988b6d",
		"category" : "Sports",
		"question" : "FIFA, The Fédération Internationale de Football Association is formed",
		"year" : 1904
	}
]
```

#### GET  [ /cards/:category ]
Get the first 100 cards in :category. Sample response:
```json 
[
	{
		"_id" : "55ff11b07b5803b920988b6c",
		"category" : ":category",
		"question" : "Julius Ceasar becomes emperor of the Roman Republic",
		"year" : -49
	}
]
```

### Categories

#### GET [ /categories ]
Sample response:
```json 
[
	"Science and Technology",
	"Exploration",
	"Arts",
	"Social Sciences",
	"Sports",
	"Other"
]
```

#### POST [ /categories ]
Sample request body:
```json 
{
	"category": "Sports"
}
```
Sample response:
```json
{
	"message": "Successfully inserted Sports"
}
```