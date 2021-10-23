/**
 * File name:  server.js
 * @author:    (c) Noor Salim
 */
const mongoose = require('mongoose');
const _CONST = require('./config/constant');
const app = require('./app');
const { log, error } = console;

mongoose.connect(_CONST.DB_URI, _CONST.DB_OPTIONS, (err) => {
  if (err) {
    error('DB Connection Error...');
    process.exit(1);
  }
  log('DB Connected...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => log(`App is running on ${PORT}...`));
