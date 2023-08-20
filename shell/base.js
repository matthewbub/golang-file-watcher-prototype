const baseVariables = {
  setupExpressRateLimit_rateLimitWindowMs: 15 * 60 * 1000,    // 15 minutes
  setupExpressRateLimit_maxRequestsPerWindow: 100,            // 100 requests
  setupExpressSlowDown_slowDownWindowMs: 15 * 60 * 1000,      // 15 minutes
  setupExpressSlowDown_delayAfterRequests: 50,                // 50 requests
  setupExpressSlowDown_delayMilliseconds: 500,                // 0.5 seconds
  setupMorgan_morganFormat: 'combined',                       // 'combined', 'common', 'dev', 'short', 'tiny'
  setupWinston_errorLogFilename: 'error.log', 
  setupWinston_combinedLogFilename: 'combined.log',
  setupWinston_defaultLogLevel: 'info'                        // 'error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'

}

module.exports = baseVariables