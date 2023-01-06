const Boom = require('boom');
const Policy = require('./policy');

module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof Policy.Error) {
      if (!ctx.request.session.id) {
        throw Boom.unauthorized();
      } else {
        throw Boom.forbidden();
      }
    } else {
      throw err;
    }
  }
};

