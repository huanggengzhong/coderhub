const Router = require("koa-router");
const momentRouter = new Router({ prefix: "/moment" });
const { create, momentList } = require("./../controller/moment.controller");
const { verifyAuth } = require("./../middleware/auth.middleware");
const { verifyContent } = require("./../middleware/moment.middleware");
// 发表动态
momentRouter.post("/", verifyAuth, verifyContent, create);
//查询分页动态列表
momentRouter.get("/", momentList);
module.exports = momentRouter;
