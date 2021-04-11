const Router = require("koa-router");
const fileRouter = new Router({ prefix: "/upload" });
const { verifyAuth } = require("./../middleware/auth.middleware");
const { avaterHandler } = require("./../middleware/file.middleware.js");
const { saveAvatarInfo } = require("./../controller/file.controller");

// 上传单个头像
fileRouter.post(
  "/avater",
  verifyAuth,
  avaterHandler.single("file"),
  saveAvatarInfo
);
module.exports = fileRouter;
