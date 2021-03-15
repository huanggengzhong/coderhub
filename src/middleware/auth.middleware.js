const service = require("./../service/user.service");
const types = require("./../constants/error-types");
const tools = require("./../uitls/tools");

const verifyLogin = async (ctx, next) => {
  //1.获取用户名和密码
  const { name, password } = ctx.request.body;
  //2.判断用户名和密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", new Error(types.NAME_OR_PASSWORD_NULL), ctx);
  }

  //3.判断用户是否存在
  const result = await service.getUserByName(name);
  const user = result[0];
  if (!user) {
    const err = new Error(types.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", err, ctx);
  }
  //4.判断用户名和密码是否一致
  if (user.name !== name || user.password !== tools.md5Password(password)) {
    const err = new Error(types.NAME_OR_PASSWORD_ERROR);
    return ctx.app.emit("error", err, ctx);
  }
  // 把用户信息加在上下文中
  ctx.user = user;
  next();
};
module.exports = {
  verifyLogin,
};
