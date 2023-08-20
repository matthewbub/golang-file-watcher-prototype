const slowDown = require("express-slow-down");

function setupExpressSlowDown() {
  return slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 50,
    delayMs: 500
  });
}

module.exports = setupExpressSlowDown;