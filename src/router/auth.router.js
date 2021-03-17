// 用户授权接口
const Router = require("koa-router");
const { verifyLogin, verifyAuth } = require("./../middleware/auth.middleware");
const { login, successAuth } = require("./../controller/auth.controller");

const authRouter = new Router();
// 登录接口
authRouter.post("/login", verifyLogin, login);
//验证登录接口
authRouter.post("/testAuth", verifyAuth, successAuth);
module.exports = authRouter;
