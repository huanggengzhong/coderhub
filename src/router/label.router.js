const Router = require("koa-router");
const labelRouter = new Router({ prefix: "/label" });
const { verifyAuth } = require("./../middleware/auth.middleware");
const { create, list } = require("./../controller/label.controller");

// 添加标签
labelRouter.post("/", verifyAuth, create);
// 获取标签列表
labelRouter.get("/", list);

module.exports = labelRouter;
