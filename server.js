/**
 * File name:  server.js
 * @author:    (c) Noor Salim
 */
require('dotenv').config();
const mongoose = require('mongoose');
const _CONST = require('./config/constant');
const app = require('./app');
const port = process.env.PORT;

mongoose.connect(_CONST.DB_URI, _CONST.DB_OPTIONS, (err, data) => {
  if (err) {
    console.error('OOPS! DB Connection Failed 😡', err.message);
    process.exit(1);
  }
  console.log('Viola! App is Connected to DB 👻');
  console.log('DB host:', data.connections._connectionString);
});

app.listen(port, () => console.log(`App is running on ${port}...`));
