const winston = require('winston');
const shell = require('../../shell/index');

function setupWinston() {
  const transports = [
    new winston.transports.File({ filename: shell.setupWinston_errorLogFilename, level: 'error' }),
    new winston.transports.File({ filename: shell.setupWinston_combinedLogFilename })
  ];

  if (process.env.NODE_ENV !== 'production') {
    transports.push(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  return winston.createLogger({
    level: shell.setupWinston_defaultLogLevel,
    format: winston.format.json(),
    transports
  });
}

module.exports = setupWinston;