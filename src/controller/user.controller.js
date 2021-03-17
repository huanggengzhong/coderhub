//给数据库操作,并返回结果的中间件
const userService = require("./../service/user.service");

class UserController {
  async create(ctx, next) {
    const obj = ctx.request.body;
    const result = await userService.create(obj);
    ctx.body = {
      code: 200,
      message: "用户注册成功",
    };
  }
}

module.exports = new UserController();
