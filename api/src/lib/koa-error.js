const extractMsg = err => {
  if (!err.message || err.message === '') {
    return err.name;
  } else {
    return err.message;
  }
};

module.exports = environment => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.output ? err.output.statusCode || 500 : 500;
    ctx.body = environment === 'test' ? { error: extractMsg(err), stack: err.stack } : { error: extractMsg(err) };
  }
};

