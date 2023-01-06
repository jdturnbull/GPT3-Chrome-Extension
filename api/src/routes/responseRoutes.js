const Router = require("koa-router");
const Response = require("../controllers/Response");

const router = new Router({ prefix: "/response" });

router.post("/respond", async (ctx, next) => {
  const {
    request: { body },
  } = ctx;

  ctx.status = 200;
  ctx.body = await Response.respond(body);

  return next();
});

module.exports = router.routes();
