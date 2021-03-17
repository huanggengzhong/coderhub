const types = require("./../constants/error-types");
const verifyContent = async (ctx, next) => {
  const { content } = ctx.request.body;
  if (!content) {
    const err = new Error(types.CONTENT_NOT_EXISTS);
    return ctx.app.emit("error", err, ctx);
  }
  await next(); //遇到的坑,一定要写await,不然后面的动态无法设置响应体
};
module.exports = {
  verifyContent,
};
