const Koa = require("koa")
const bodyParser = require('koa-bodyparser')
const useRoutes = require("../router")

const errorHandle = require("./error-handle")
const app = new Koa();

app.useRoutes = useRoutes; //路由函数赋值
//参数处理插件
app.use(bodyParser())
// 路由
app.useRoutes()
// 错误
app.on("error", errorHandle)

module.exports = app;
