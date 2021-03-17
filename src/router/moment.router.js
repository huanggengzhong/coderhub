const Router = require("koa-router");
const momentRouter = new Router({ prefix: "/moment" });
const { create } = require("./../controller/moment.controller");
const { verifyAuth } = require("./../middleware/auth.middleware");
const { verifyContent } = require("./../middleware/moment.middleware");
// 发表动态
momentRouter.post("/", verifyAuth, verifyContent, create);

module.exports = momentRouter;
