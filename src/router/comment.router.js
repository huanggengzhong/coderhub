const Router = require("koa-router");
const commentRouter = new Router({ prefix: "/comment" });
const {
  verifyAuth,
  verifyPermission,
} = require("./../middleware/auth.middleware");
const {
  create,
  reply,
  update,
  remove,
  list,
} = require("./../controller/comment.controller");
// 发表评论
commentRouter.post("/", verifyAuth, create);
// 根据评论回复
commentRouter.post("/:commentId/reply", verifyAuth, reply);

// 修改评论
commentRouter.patch("/:comment_id", verifyAuth, verifyPermission, update);
// 删除评论
commentRouter.delete("/:comment_id", verifyAuth, verifyPermission, remove);
// 评论列表
commentRouter.get("/", list);

module.exports = commentRouter;
