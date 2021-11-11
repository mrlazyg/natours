/**
 * File name:  server.js
 * @author:    (c) Noor Salim
 */
const mongoose = require('mongoose');
const _CONST = require('./config/constant');
const app = require('./app');

mongoose.connect(_CONST.DB_URI, _CONST.DB_OPTIONS, (err) => {
  if (err) {
    console.error('DB Connection Error...');
    process.exit(1);
  }
  console.log('DB Connected...');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running on ${port}...`));
