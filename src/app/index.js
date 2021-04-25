const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const useRoutes = require("../router");
const errorHandle = require("./error-handle");
const app = new Koa();
const session = require("koa-session");

//cookie设置
app.keys = ["some secret hurr"];
const CONFIG = {
  key: "koa:sess",
  maxAge: 86400000,
};
// koa-session中间件初始化
app.use(session(CONFIG, app));
//app对象添加路由函数
app.useRoutes = useRoutes;
//参数处理插件
app.use(bodyParser());
// 路由
app.useRoutes();

// 错误监听
app.on("error", errorHandle);

module.exports = app;
