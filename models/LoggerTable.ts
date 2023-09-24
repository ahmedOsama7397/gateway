const mongoose = require("mongoose");

const loggerSchema = new mongoose.Schema({
  key: {
    type: String,
  },
  uuid: {
    type: String,
  },
  time: {
    type: String,
  },
  request: {
    type: Object,
  },
  response: {
    type: Object,
  },
  status: {
    type: String,
  },
  platform: {
    type: String,
  },
  environment: {
    type: String,
  },
  responseTime: {
    type: Number,
  },
});

const LoggerTable = mongoose.model("LoggerTable", loggerSchema);

export default LoggerTable;
