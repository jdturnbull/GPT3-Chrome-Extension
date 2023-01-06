const Router = require("koa-router");
const User = require("../controllers/User");

const router = new Router({ prefix: "/user" });

router.post("/auth", async (ctx, next) => {
  const {
    request: { body },
  } = ctx;

  ctx.status = 200;
  ctx.body = await User.auth(body);

  return next();
});

module.exports = router.routes();
