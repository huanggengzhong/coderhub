const Router = require("koa-router");
const momentRouter = new Router({ prefix: "/moment" });
const {
  create,
  momentList,
  detail,
  edit,
  remove,
  addLabels,
} = require("./../controller/moment.controller");
const {
  verifyAuth,
  verifyPermission,
} = require("./../middleware/auth.middleware");
const { verifyContent } = require("./../middleware/moment.middleware");
const { verifyLabelExists } = require("./../middleware/label.middleware");
// 发表动态
momentRouter.post("/", verifyAuth, verifyContent, create);
//查询分页动态列表
momentRouter.get("/", momentList);
// 动态明细
momentRouter.get("/:moment_id", detail);
//修改(需要登录和验证是否自己,最后才是操作)
momentRouter.patch("/:moment_id", verifyAuth, verifyPermission, edit);
//删除(需要登录和验证是否自己,最后才是操作)
momentRouter.delete("/:moment_id", verifyAuth, verifyPermission, remove);

// 给动态添加标签
momentRouter.post(
  "/:moment_id/labels",
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabels
);

// 动态配图

module.exports = momentRouter;
