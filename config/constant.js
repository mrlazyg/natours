const globalConstant = {};

globalConstant.STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  DELETED: 204,
  BAD_REQUEST: 400,
  UNATHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  PRECONDITION: 412,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

globalConstant.DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/'; // TODO: always remove the server url
globalConstant.DB_OPTIONS = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.DB_NAME || 'NATOURS',
};

module.exports = globalConstant;
