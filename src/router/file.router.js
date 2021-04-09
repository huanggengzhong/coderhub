const Router = require("koa-router");
const fileRouter = new Router({ prefix: "/file" });

fileRouter.post("/");
module.exports = fileRouter;
