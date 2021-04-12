const fileService = require("../service/file.service");
const momentService = require("./../service/moment.service");
const fs = require("fs");
const { PICTURE_PATH } = require("./../constants/file-path");
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
    const result = await momentService.getList(data);
    // console.log(result, "result");
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
  async remove(ctx, next) {
    const { moment_id } = ctx.params;
    let result = await momentService.delete(moment_id);
    if (result.length > 0) {
      ctx.body = {
        code: 200,
        message: "删除成功",
      };
    }
  }
  async addLabels(ctx, next) {
    const { labels } = ctx;
    const { moment_id } = ctx.params;
    console.log(labels, "取上下文中的Labels");
    // 判断是否已经在关系表里
    for (const label of labels) {
      const isExist = await momentService.hasLabel(moment_id, label.id);
      if (!isExist) {
        console.log("不存在");
        await momentService.addLabel(moment_id, label.id);
      } else {
        console.log("存在");
      }
    }
    ctx.body = {
      code: 200,
      message: "给动态添加标签成功~",
    };
  }
  async fileInfo(ctx, next) {
    let { filename } = ctx.params;
    const fileInfo = await fileService.getFileByFilename(filename);

    // 增加类型显示
    const { type } = ctx.query;
    const types = ["small"]; //目前暂定一种,要多种的话在上传时分割多种即可

    if (types.some((item) => item === type)) {
      filename = type + "_" + filename;
    }
    // 显示图片
    ctx.response.set("content-type", fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}
module.exports = new MomentController();
