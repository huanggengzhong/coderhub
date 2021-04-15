const Router = require("koa-router");
const { sendCode } = require("./../middleware/common.middleware");

const commonRouter = new Router({
  prefix: "/common",
});

// 获取二维码
commonRouter.get("/sendPicCode", sendCode);

module.exports = commonRouter;
