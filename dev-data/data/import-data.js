const fs = require('fs');
const mongoose = require('mongoose');
const _CONST = require('../../config/constant');
const Tour = require('../../models/Tour');

mongoose.connect(_CONST.DB_URI, _CONST.DB_OPTIONS, (err) => {
  if (err) {
    console.error('DB Connection Error...');
    process.exit(1);
  }
  console.log('DB Connected...');
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data imported...');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted...');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === 'import') {
  importData();
} else if (process.argv[2] === 'delete') {
  deleteData();
}
