const morgan = require('morgan');

function setupMorgan(logger) {
  return morgan('combined', { stream: { write: message => logger.info(message.trim()) } });
}

module.exports = setupMorgan;