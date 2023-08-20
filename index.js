require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const winston = require('winston');
const setupWinston = require('./ucan/express-middleware/setupWinston');
const setupExpressRateLimit = require('./ucan/express-middleware/setupExpressRateLimit');
const setupExpressSlowDown = require('./ucan/express-middleware/setupExpressSlowDown');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up logging with winston and morgan
const logger = setupWinston();
if (process.env.NODE_ENV !== 'production') logger.add(new winston.transports.Console({format: winston.format.simple()}));

app.use(setupMorgan(logger));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(setupExpressRateLimit());
app.use(setupExpressSlowDown());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
