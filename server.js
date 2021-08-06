const { redBright, greenBright, yellow } = require('chalk');
const mongoose = require('mongoose');
const _CONST = require('./config/constant');
const app = require('./app');
const { log, error } = console;

mongoose.connect(_CONST.DB_URI, _CONST.DB_OPTIONS, (err) => {
  if (err) {
    error(redBright('DB Connection Error...'));
    process.exit(1);
  }
  log(greenBright.italic('DB Connected...'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => log(yellow.underline.italic(`App is running on ${PORT}...`)));
