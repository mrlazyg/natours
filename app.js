/**
 * File name:  app.js
 * @author:    (c) Noor Salim
 */
const express = require('express');
const morgan = require('morgan');
const swagger = require('swagger-ui-express');

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

app.get(['/', '/api', '/status', '/api/status', '/api/v1', '/api/v1/status'], (req, res) => {
  res.cookie(
    'access_token',
    'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTYyOTM4NjEyOSwiZXhwIjoxNjI5Mzg5NzI5fQ',
    { maxAge: 30000 }
  );
  res.status(200).send({
    name: process.env.APP_NAME || 'natours-api',
    status: 'success',
    description: '',
    uptime: process.uptime(),
  });
});

module.exports = app;
