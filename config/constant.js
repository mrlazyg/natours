const globalConstant = {};

globalConstant.STATUS_CODES = {
  OK_STATUS: 200,
  CREATED_STATUS: 201,
  DELETED_STATUS: 204,
  BAD_REQUEST_STATUS: 400,
  UNATHORIZED_STATUS: 401,
  FORBIDDEN_STATUS: 403,
  NOT_FOUND_STATUS: 404,
  PRECONDITION_FAILED: 412,
  INTERNAL_ERROR_STATUS: 500,
};

globalConstant.DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/';
globalConstant.DB_OPTIONS = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.DB_NAME || 'NATOURS',
};

// TODO: always remove the server url

module.exports = globalConstant;
