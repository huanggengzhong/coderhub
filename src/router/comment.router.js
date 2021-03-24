const Router = require("koa-router");
const commentRouter = new Router({ prefix: "/comment" });
const { verifyAuth } = require("./../middleware/auth.middleware");
const { create,reply } = require("./../controller/comment.controller");
// 发表评论
commentRouter.post("/", verifyAuth, create);
// 根据评论回复
commentRouter.post("/:commentId/reply",verifyAuth,reply)

module.exports = commentRouter;
