const slowDown = require("express-slow-down");
const shell = require('../../shell/index');

function setupExpressSlowDown() {
  return slowDown({
    windowMs: shell.setupExpressSlowDown_slowDownWindowMs,
    delayAfter: shell.setupExpressSlowDown_delayAfterRequests,
    delayMs: shell.setupExpressSlowDown_delayMilliseconds
  });
}

module.exports = setupExpressSlowDown;