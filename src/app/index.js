const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const useRoutes = require("../router");

const errorHandle = require("./error-handle");

const app = new Koa();

const session = require("koa-session");
app.keys = ["some secret hurr"];
const CONFIG = {
  key: "koa:sess", // 默认值，自定义cookie中的key
  maxAge: 86400000,
};

app.use(session(CONFIG, app)); // 初始化koa-session中间件

app.useRoutes = useRoutes; //路由函数赋值

//参数处理插件
app.use(bodyParser());
// 路由
app.useRoutes();

// 错误
app.on("error", errorHandle);

module.exports = app;
