var Hashids = require('hashids'),
    salt = require('config').hashid_salt;

/**
 * Hashids instance with salt from config.
 * @type {Hashids}
 */
module.exports = exports = new Hashids(salt);
