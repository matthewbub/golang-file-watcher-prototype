const baseVariables = {
  setupExpressRateLimit_rateLimitWindowMs: 15 * 60 * 1000,
  setupExpressRateLimit_maxRequestsPerWindow: 100,
  setupExpressSlowDown_slowDownWindowMs: 15 * 60 * 1000,
  setupExpressSlowDown_delayAfterRequests: 50,
  setupExpressSlowDown_delayMilliseconds: 500,
  
}

module.exports = baseVariables