const Boom = require("boom");
const stytch = require("stytch");
const jwt = require("jsonwebtoken");
const Database = require("../../data/Database");
const { stych, environment } = require("../../config");
const Posthog = require("../../adapters/Posthog");
const { uuid } = require("uuidv4");

const allowed_routes = ["/user/auth", "/user/authCallback", "/user/stripeWebhook", "/document/retrieveShared"];

const client = new stytch.Client({
  project_id: stych.project_id,
  secret: stych.secret,
  env: environment === "production" ? stytch.envs.live : stytch.envs.test,
});

module.exports = async input => {
  const { ctx } = input;

  try {
    if (allowed_routes.includes(ctx.request.url.split("?")[0])) {
      return true;
    }

    const authHeader = ctx.request.headers.authorization;

    if (!authHeader) {
      ctx.status = 401;
      return;
    }

    const token = ctx.request.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const {
      session: { user_id },
    } = await client.sessions.authenticate({ session_token: decoded.token });

    const user = await Database.db("users")
      .where("id", user_id)
      .first();

    if (!user) {
      ctx.status = 404;
      return;
    }

    if (user.wordCount >= user.wordLimit && user.subscriptionStatus === "UNSUBSCRIBED") {
      if (ctx.request.url.split("?")[0] === "/user/createCheckoutSession") {
        return user;
      } else {
        ctx.status = 402;
        return;
      }
    }

    return user;
  } catch (error) {
    if (error.status === 404) {
      // navigate back to a sign up screen
    }
  }
};
