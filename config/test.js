module.exports = {
  // Server config
  api: {
    name: 'TestOfTime',
    port: 3000
  },

  admin: {
    name: 'TestOfTimeAdmin',
    port: 8080
  },

  secrets: {
    cookieSecret: 'thisshouldbehardtoguess'
  },

  // Database options
  mongo: {
    uri: 'mongodb://localhost/testoftime-test',
  }

};
