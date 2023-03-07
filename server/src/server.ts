import express from 'express';
const logger = require('morgan')

const server = express();

/** Parse body */
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

/** Log the request */
server.use(logger('dev'));

/** Cors */
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

/** Healthcheck */
server.get('/ping', (req, res) => {
    return res.status(200).json({ hello: 'world' })
})

/** Error handling */
server.use((req, res) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    })
})

module.exports = server;