const express = require('express');
const morgan = require('morgan');

const app = express();

// 1. MIDDLEWARES
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
    console.log('hello from the middleware');
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// 3. ROUTES


module.exports = app;