const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, AUTH_TIME } = require("../app/config");
class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: AUTH_TIME, //时间秒,这里代表一天
      algorithm: "RS256",
    });
    ctx.body = {
      code: 200,
      data: {
        id,
        name,
        token,
      },
      message: "登录成功",
    };
  }
  async successAuth(ctx, next) {
    ctx.body = {
      code: 200,
      message: "登录授权成功",
    };
  }
}
module.exports = new AuthController();
