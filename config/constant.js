const globalConstant = {};
globalConstant.DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/';
globalConstant.DB_OPTIONS = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.DB_NAME || 'local',
};

// TODO: always remove the server url

module.exports = globalConstant;
