const labelService = require("./../service/label.service");
class LabelController {
  async create(ctx, next) {
    const { content } = ctx.request.body;
    const result = await labelService.create(content);
    if (result) {
      ctx.body = {
        code: 200,
        message: "新增标签成功",
      };
    }
  }
  async list(ctx, next) {
    const { offset, size } = ctx.request.body;
    const result = await labelService.getLabels({ offset, size });
    if (result) {
      ctx.body = {
        code: 200,
        data: result,
        message: "获取标签成功",
      };
    }
  }
}
module.exports = new LabelController();
