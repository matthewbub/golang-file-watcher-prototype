require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const winston = require('winston');
const _ = require('lodash');
const localesApi = require('./routes/localesApi');
const screensApi = require('./routes/screensApi');
const subscriberApi = require('./routes/subscriberApi');
const helpdeskApi = require('./routes/helpdeskApi');

const app = express();

// Logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// If we're not in production, log to the `console` with the format: `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev')); // Logging HTTP requests
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(localesApi);
app.use(screensApi);
app.use(subscriberApi);
app.use(helpdeskApi);

app.listen(process.env.PORT || 3000, () => {
  logger.info(`Server is running on port ${process.env.PORT || 3000}`);
});
