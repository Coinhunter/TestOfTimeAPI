# Test of Time

## About the game

Test of Time is a history-game. The idea is that each player has a timeline with a unique random starting year on it. Players take turns drawing cards from a deck. On each card is a question or statement that has a specific year as its' answer. If the player can place the card in the correct position on the timeline he or she gets to draw another card without yielding the turn. If the player is unable to place the card in the correct interval all cards gained since the start of that turn are lost and the next player gets to play. Every time a card has been placed correctly on the timeline the player may choose to end his or her turn and keep all of the cards gained that turn. This way players will accumulate cards over time. The more cards a player gets the harder it will get to place it in the right timeslot. If two cards have the same year as answer the player must be able to pinpoint the exact year.



## Setup Instructions (OSX)

To run this API you have to have Node installed. This project uses version 4.

	$ npm install

You also have to be running MongoDB locally:
	
	$ sudo mongod

In order to make calls to the API basic authentication is required. To create an initial user with username: `testoftime@time.now` and password: `password` run create_user.js. To query the API with this username headers should include one `Authorization` entry with value `Basic dGVzdG9mdGltZUB0aW1lLm5vdzpwYXNzd29yZA==`. This will obviously be a different value once your instance has other users, but it's a good starting point. You also need to set a `Content-Type` header with `application/json` for it to work.
	
	$ node create_user.js

To populate the database with some initial cards the repository comes with a resource file. You can load this when logged in to admin interface.

## API Endpoints

To start a server in API mode:

	$ npm run start-api


#### GET  [ / ]
Returns an empty object. Authentication is not required for this. Use this to see if the service is up.
```json 
{ }
```

### Cards

#### GET  [ /cards/:category/:languagekey ]
Get the first 100 cards in :category and language. Language keys are sv, en.
Sample response:
```json 
[
  {
    "_id": "565e39ab35caedcc127626b8",
    "year": 1059,
    "category": "Other",
    "languages": {
      "sv": "",
      "en": "The first pope is elected."
    }
  },
  {
    "_id": "565d5aa435caedcc12762699",
    "year": -2600,
    "category": "Other",
    "languages": {
      "sv": "",
      "en": "Stonehenge is constructed."
    }
  },
]
```

### Categories

#### GET [ /categories ]
Sample response:
```json 
[
  {
    "_id": "56c66fbaeafc02471d63fa65",
    "category": "Other"
  },
  {
    "_id": "56c7accb8e71898c1dfc0994",
    "category": "Sports"
  },
  {
    "_id": "56c7c33afd39c7e42549c15e",
    "category": "Politics"
  }
]
```

## Admin Interface

To start a server in Admin mode:

	$ npm run start-admin
