const commentService = require("./../service/comment.service");
class CommentController {
  async create(ctx, next) {
    const { content, moment_id } = ctx.request.body;
    const { id } = ctx.user;
    const result = await commentService.create({ content, moment_id, id });
    console.log(result, "result");
    if (result) {
      ctx.body = {
        code: 200,
        message: "新增评论成功",
      };
    }
  }
  async reply(ctx, next) {
    //  todo
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;
    const result = await commentService.reply(momentId, content, id, commentId);
    if (result) {
      ctx.body = {
        code: 200,
        message: "回复评论成功",
      };
    }
  }
  async update(ctx, next) {
    //遇到的大坑一定要写ctx,不然会在授权页面报ctx is not defined的错
    // console.log("准备修改");
    const { comment_id } = ctx.params;
    const { content } = ctx.request.body;
    const result = await commentService.update(comment_id, content);
    if (result) {
      ctx.body = {
        code: 200,
        message: "修改评论成功",
      };
    }
  }
  async remove(ctx, next) {
    const { comment_id } = ctx.params;
    const result = await commentService.remove(comment_id);
    if (result) {
      ctx.body = {
        code: 200,
        message: "删除评论成功",
      };
    }
  }
  async list() {
    const { momentId } = ctx.query;
    console.log(momentId, "momentId");
  }
}
module.exports = new CommentController();
