const service = require("./../service/user.service");
const types = require("./../constants/error-types");
const tools = require("./../uitls/tools");

// 用户验证
const verifyUser = async (ctx, next) => {
  //1.获取用户名和密码
  const { name, password } = ctx.request.body;
  //2.判断用户名和密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", new Error(types.NAME_OR_PASSWORD_NULL), ctx);
  }

  //3.判断用户名是否注册过
  const result = await service.getUserByName(name);
  if (result.length > 0) {
    //注册过
    const err = new Error(types.NAME_ALREADY_EXISTS);
    return ctx.app.emit("error", err, ctx);
  }

  //4.执行下一个中间件
  await next();
};
// 密码加密中间件
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = tools.md5Password(password);
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
