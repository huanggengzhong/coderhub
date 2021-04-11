//给数据库操作,并返回结果的中间件
const fileService = require("../service/file.service");
const userService = require("./../service/user.service");
const fs = require("fs");
const { AVATER_PATH } = require("./../constants/file-path");

class UserController {
  async create(ctx, next) {
    const obj = ctx.request.body;
    const result = await userService.create(obj);
    ctx.body = {
      code: 200,
      message: "用户注册成功",
    };
  }
  async avaterInfo(ctx, next) {
    const { userId } = ctx.params;
    const avaterInfo = await fileService.getAvatarByUserId(userId);
    if (avaterInfo) {
      ctx.response.set("content-type", avaterInfo.mimetype);
      ctx.body = fs.createReadStream(`${AVATER_PATH}/${avaterInfo.filename}`);
    }
  }
}

module.exports = new UserController();
