const rateLimit = require('express-rate-limit');
const shell = require('../../shell/index');

function setupExpressRateLimit() {
  return rateLimit({
    windowMs: shell.setupExpressRateLimit_rateLimitWindowMs,
    max: shell.setupExpressRateLimit_maxRequestsPerWindow
  });
}

module.exports = setupExpressRateLimit;