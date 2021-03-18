const service = require("./../service/user.service");
const AuthService = require("./../service/authService");
const types = require("./../constants/error-types");
const tools = require("./../uitls/tools");
const { PUBLIC_KEY } = require("./../app/config");
const jwt = require("jsonwebtoken");

//登录权限
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
// token权限
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  // 1.判断token不能为空
  if (!authorization) {
    const err = new Error(types.UNAUTHORIZATION);
    return ctx.app.emit("error", err, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  // 2.jwt验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    // console.log(result); //验证成功会到这里,返回result,如:{ id: 4, name: '18825113670', iat: 1615957753, exp: 1616044153 }
    ctx.user = result;
    await next();
  } catch (error) {
    const err = new Error(types.ERROR_AUTHORIZATION);
    return ctx.app.emit("error", err, ctx);
  }
};
/**
 * 验证是否有操作数据库表的权限
 * @param {*} ctx
 * @param {*} next
 * result:Boolean
 */
const verifyPermission = async (ctx, next) => {
  try {
    // 1.根据传递的参数名获取表名和数据库id名,比如参数{ comment_id: '1' },最终得到commont,1
    const [resouseName] = Object.keys(ctx.params);
    const tableName = resouseName.replace("_id", "");
    const dataId = ctx.params[resouseName];
    const user_id = ctx.user.id;
    // 2.查询数据库是否具备权限
    const isPermiassion = await AuthService.checkResource({
      tableName,
      dataId,
      user_id,
    });
    if (!isPermiassion) {
      const err = new Error(types.NO_DATA_EDIT_AUTH);
      return ctx.app.emit("error", err, ctx);
    }
    console.log(isPermiassion, "isPermiassion");
    await next();
  } catch (error) {
    throw new Error(error, "verifyPermission");
  }
};
module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
