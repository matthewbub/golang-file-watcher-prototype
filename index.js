require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const winston = require('winston');
const setupWinston = require('./ucan/express-middleware/setupWinston');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up logging with winston and morgan
const logger = setupWinston();
if (process.env.NODE_ENV !== 'production') logger.add(new winston.transports.Console({format: winston.format.simple()}));


// Apply middleware
app.use(setupMorgan(logger));
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rate limiter and speed limiter
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

app.use(slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // allow 50 requests to go at full-speed, then...
  delayMs: 500 // begin adding 500ms of delay per request above 50
}));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
