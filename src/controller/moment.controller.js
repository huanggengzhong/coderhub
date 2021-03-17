const momentService = require("./../service/moment.service");
class MomentController {
  async create(ctx, next) {
    //1.获取传递的数据
    const data = { content: ctx.request.body.content, user_id: ctx.user.id };
    //2.执行数据库中间件
    const result = await momentService.create(data);
    ctx.body = {
      code: 200,
      message: "新增动态成功",
    };
  }
}
module.exports = new MomentController();
