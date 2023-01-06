const bunyan = require("bunyan");
const { application, environment } = require("./config");

module.exports = bunyan.createLogger({
  name: application,
  env: environment,
  level: bunyan.DEBUG,
  streams: [{ stream: process.stdout }],
});
