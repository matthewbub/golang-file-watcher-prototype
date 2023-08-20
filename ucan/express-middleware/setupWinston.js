const winston = require('winston');

/**
 * setupWinston
 * 
 * Configures and sets up the winston logger object.
 * 
 * @returns {object} - Returns a winston logger object.
 */
function setupWinston() {
  const transports = [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ];

  if (process.env.NODE_ENV !== 'production') {
    transports.push(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  return winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports
  });
}

module.exports = setupWinston;