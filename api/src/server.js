const Koa = require("koa");
const bodyParser = require("koa-body");
const bearerToken = require("koa-bearer-token");
const cors = require("@koa/cors");
const qs = require("koa-qs");
const { mountRoutes } = require("./routes");
const { environment } = require("./config");
const koaLogger = require("./lib/koa-logger");
const koaError = require("./lib/koa-error");
const koaSession = require("./lib/koa-session");
const logger = require("./logger");

module.exports = () => {
  const app = new Koa();

  qs(app);
  app.use(cors());
  app.use(bodyParser());
  app.use(bearerToken());

  app.use(koaLogger(logger));
  app.use(koaError(environment));
  app.use(koaSession());

  mountRoutes(app);

  return app;
};
