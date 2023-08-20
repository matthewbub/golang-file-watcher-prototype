require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const winston = require('winston');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up logging with winston and morgan
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Apply middlewares
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
