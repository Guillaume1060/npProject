const express = require('express');
const morgan = require('morgan');

const concertRouter = require('./routes/concertRoutes');
const artistRouter = require('./routes/artistRoutes');
const venueRouter = require('./routes/venueRoutes');


const app = express();

// 1. MIDDLEWARES
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
app.use('/api/v1/concerts', concertRouter);
app.use('/api/v1/artists', artistRouter);
app.use('/api/v1/venues', venueRouter);



module.exports = app;