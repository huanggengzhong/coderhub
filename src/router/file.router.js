const Router = require("koa-router");
const fileRouter = new Router({ prefix: "/upload" });
const { verifyAuth } = require("./../middleware/auth.middleware");
const {
  avaterHandler,
  pictureHandler,
  pictureResize,
} = require("./../middleware/file.middleware.js");
const {
  saveAvatarInfo,
  savePictureInfo,
} = require("./../controller/file.controller");

// 上传单个头像
fileRouter.post(
  "/avater",
  verifyAuth,
  avaterHandler.single("file"),
  saveAvatarInfo
);
fileRouter.post(
  "/picture",
  verifyAuth,
  pictureHandler,
  pictureResize,
  savePictureInfo
);
module.exports = fileRouter;
