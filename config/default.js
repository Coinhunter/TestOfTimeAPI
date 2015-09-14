/**
 * Default configuration should be as close to production config as possible.
 * Any REQUIRED deviations can be added to environment-specific >env>.js files.
 *
 * @type {Object}
 */
module.exports = {

  // The current environment
  mode: 'default',

  // Logging configuration
  logging: {
    level: 'info'
  },

  // Server config
  server: {
    name: 'testoftime',
    port: 3000
  },

  // Database options
  mongo: {
    uri: 'mongodb://localhost/testoftime'
  },

  // Salt string used to obfuscate ids
  // This string should never change
  hashid_salt: 'Mostly Harmless'

};
