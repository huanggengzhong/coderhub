const Multer = require("koa-multer");
const path = require("path");
const { AVATER_PATH } = require("../constants/file-path");
const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/avater");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
// 上传头像
const avaterHandler = Multer({ storage });
module.exports = {
  avaterHandler,
};

// 上传动态图片
