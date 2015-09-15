var bunyan = require('bunyan'),
    config = require('config'),
    path = require('path'),
    logger_name = config.server.name,
    log_file_path = process.env.NODE_LOG_FILE_PATH;


log_file_path = log_file_path || path.join('../..', logger_name + '.log');
log_file_path = path.normalize(log_file_path);
log_file_path = path.resolve(log_file_path);


/**
 * @type {Bunyan} Shared bunyan logger instance.
 */
module.exports = exports = bunyan.createLogger({
  name: logger_name,
  level: config.logging.level,
  streams: [
    {
      type: 'rotating-file',
      path: log_file_path,
      period: '1d', // daily rotation
      count: 3 // keep 3 back copies
    }
  ]
});
