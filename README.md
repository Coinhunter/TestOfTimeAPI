# Test of Time API

## Purpose

TestOfTime is a game where the player is supposed to organize historical events in chronological order.

## Setup Instructions (OSX)

To run this API you have to have Node installed. This project uses version 4.

	$ npm install

You also have to be running MongoDB locally:
	
	$ sudo mongod

In order to make calls to the API basic authentication is required. To create an initial user with username: `testoftime@time.now` and password: `password` run create_user.js. To query the API with this username headers should include one `Authorization` entry with value `Basic dGVzdG9mdGltZUB0aW1lLm5vdzpwYXNzd29yZA==`. This will obviously be a different value once your instance has other users, but it's a good starting point. You also need to set a `Content-Type` header with `application/json` for it to work.
	
	$ node create_user.js

To populate the database with some initial cards from terminal:

	$ node card_loader.js

This uses the cards.json file in the res folder. This feature will likely be removed eventually. If you have edited the file make sure that the data file is proper json encoded. (http://jsonlint.com/)

You can also set up some categories.

	$ node category_loader.js

Uses the categories.json file in the res folder.

## API

To start a server in API mode:

	$ npm run start-api


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

### Cards

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

## Admin

To start a server in Admin mode:

	$ npm run start-admin
