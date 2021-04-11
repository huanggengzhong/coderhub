const Router = require("koa-router");

const { verifyUser, handlePassword } = require("../middleware/user.middleware");
const { avaterInfo } = require("../controller/user.controller");
const userRouter = new Router({
  prefix: "/user",
});

// 最后数据处理中间件
const { create } = require("../controller/user.controller");
userRouter.post("/register", verifyUser, handlePassword, create);
// 用户头像
userRouter.get("/:userId/avater", avaterInfo);

module.exports = userRouter;
