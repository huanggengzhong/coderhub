const momentRouter = require("../router/moment.router");
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
  async momentList(ctx, next) {
    const data = {
      size: ctx.request.body.size,
      offset: ctx.request.body.offset,
    };
    console.log(data, "data");
    const result = await momentService.getList(data);
    console.log(result, "result");
    ctx.body = {
      code: 200,
      data: result,
      message: "查询结果",
    };
  }
  async detail(ctx, next) {
    const { moment_id } = ctx.params;
    const result = await momentService.detail(moment_id);
    ctx.body = {
      code: 200,
      data: result[0] || [],
      message: "查询成功",
    };
  }
  async edit(ctx, next) {
    const { moment_id } = ctx.params;
    const { content } = ctx.request.body;
    let result = await momentService.edit(moment_id, content);
    if (result.length > 0) {
      ctx.body = {
        code: 200,
        data: +moment_id,
        message: "修改成功",
      };
    }
  }
}
module.exports = new MomentController();
