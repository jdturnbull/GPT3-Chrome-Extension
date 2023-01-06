const Boom = require("boom");
const Router = require("koa-router");
const cors = require("@koa/cors");
const responseRoutes = require("./responseRoutes");
const userRoutes = require("./userRoutes");

function mountRoutes(app) {
  app.use(cors());

  app.use(userRoutes);
  app.use(responseRoutes);

  app.use(
    new Router().allowedMethods({
      notImplemented: () => Boom.notImplemented(),
      methodNotAllowed: () => Boom.methodNotAllowed(),
    }),
  );
}

module.exports = { mountRoutes };
