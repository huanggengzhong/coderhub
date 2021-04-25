const Router = require("koa-router");
const cosRouter = new Router({ prefix: "/cos" });
const { verifyAuth } = require("./../middleware/auth.middleware");
const { cosHandler } = require("./../middleware/file.middleware");

const { saveAvatarInfo, cosfile } = require("./../controller/file.controller");

// 上传单个图片
// verifyAuth
cosRouter.post("/picture", verifyAuth, cosHandler, cosfile);

module.exports = cosRouter;
