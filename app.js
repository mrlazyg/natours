/**
 * File name:  app.js
 * @author:    (c) Noor Salim
 */
const express = require('express');
const morgan = require('morgan');
const swagger = require('swagger-ui-express');

const { health } = require('./controllers/Health');
const tourRouter = require('./routes/TourRoutes');
const userRouter = require('./routes/UserRoutes');
// const swaggerDoc = require('./swagger/swagger.json');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

// app.use('/api/docs/v1', swagger.serve, swagger.setup(swaggerDoc));
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.get(['/', '/api', '/status', '/api/status', '/api/v1', '/api/v1/status'], health);

module.exports = app;
