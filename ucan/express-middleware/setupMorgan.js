const morgan = require('morgan');
const shell = require('../../shell/index');

function setupMorgan(logger) {
  return morgan(shell.setupMorgan_morganFormat, { stream: { write: message => logger.info(message.trim()) } });
}

module.exports = setupMorgan;