/**
 * File name:  app.js
 * @author:    (c) Noor Salim
 */
const express = require('express');
const morgan = require('morgan');
const swagger = require('swagger-ui-express');

const ErrorHandler = require('./utils/ErrorHandler');
const { health } = require('./controllers/Health');
const tourRouter = require('./routes/TourRoutes');
const userRouter = require('./routes/UserRoutes');
const swaggerDoc = require('./swagger/swagger.json');
const openAPIDoc = require('./swagger/openapi_1.json');

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

app.use('/api/v1/docs', swagger.serve, swagger.setup(swaggerDoc, swaggerOptions)); // serve single swagger document
// serve multiple swagger documents
// app.use('/api/v1/docs', swagger.serveFiles(swaggerDoc), swagger.setup(swaggerDoc, swaggerOptions));
// app.use('/api/v2/docs', swagger.serveFiles(openAPIDoc), swagger.setup(swaggerDoc, swaggerOptions));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.get(['/', '/api/health'], health);
app.get(['/api', '/status', '/api/status', '/api/v1', '/api/v1/status'], (req, res) => res.redirect(307, '/'));

app.all('*', (req, res, next) => {
  next(new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  // console.log(err.stack);
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message,
  });
});

module.exports = app;
