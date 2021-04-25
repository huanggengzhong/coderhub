const Router = require("koa-router");
const cosRouter = new Router({ prefix: "/cos" });
const { verifyAuth } = require("./../middleware/auth.middleware");
const { cosHandler } = require("./../middleware/file.middleware");

const { saveAvatarInfo, cosfile } = require("./../controller/file.controller");

// 上传单个头像
// verifyAuth
cosRouter.post("/avater", cosHandler, cosfile);

module.exports = cosRouter;
