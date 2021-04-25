// 批量导入router文件夹下的除index外的全部路由
const fs = require("fs");
// console.log(fs.readdirSync(__dirname), "fs.readdirSync(__dirname)");//找出当前文件夹下的全部文件数组
const useRoutes = function () {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === "index.js") return;
    const router = require(`./${file}`);
    this.use(router.routes());
    this.use(router.allowedMethods());
  });
};
module.exports = useRoutes;
