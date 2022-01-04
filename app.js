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
const swaggerDoc = require('./swagger/swagger.json');
const openAPIDoc = require('./swagger/openapi.json');

const swaggerOptions = {
  customSiteTitle: 'API Docs',
  // customfavIcon: '/assets/favicon.ico',
  customCss: '.swagger-ui .topbar { display: none }',
  explorer: true,
};

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

// app.use('/api/v1/docs', swagger.serve, swagger.setup(swaggerDoc, swaggerOptions)); // serve single swagger document
// serve multiple swagger documents
app.use('/api/v1/docs', swagger.serveFiles(swaggerDoc), swagger.setup(swaggerDoc, swaggerOptions));
app.use('/api/v2/docs', swagger.serveFiles(openAPIDoc), swagger.setup(swaggerDoc, swaggerOptions));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.get(['/', '/api', '/status', '/api/status', '/api/v1', '/api/v1/status'], health);

module.exports = app;
