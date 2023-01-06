module.exports = () => async (ctx, next) => {
  // if (!ctx.request.token) {
  //   ctx.request.session = {};
  // } else {
  //   const session = await Session.validate({ token: ctx.request.token });
  //   ctx.request.session = session;
  // }

  return next();
};

