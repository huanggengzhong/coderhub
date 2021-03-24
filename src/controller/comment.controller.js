const commentService = require("./../service/comment.service");
class CommentController {
  async create(ctx, next) {
    const { content, moment_id } = ctx.request.body;
    console.log(ctx.request.body);
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
 async reply(ctx,next){
    //  todo
 }
}
module.exports = new CommentController();
