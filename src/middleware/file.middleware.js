const Multer = require("koa-multer");
const Jimp = require("jimp");
const path = require("path");
const { AVATER_PATH, PICTURE_PATH } = require("../constants/file-path");
const storageAvater = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, AVATER_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
// 上传头像
const avaterHandler = Multer({ storage: storageAvater });

// 上传动态图片
const storagePicture = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PICTURE_PATH);
  },
  filename: (req, file, cb) => {
    console.log(file, "file666");
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
// 上传动态图
const pictureUpload = Multer({ storage: storagePicture });
const pictureHandler = pictureUpload.array("file", 9);
// 对文件进行裁剪
const pictureResize = async (ctx, next) => {
  try {
    console.log("pictureResize");
    const files = ctx.req.files;
    // 对图像进行处理
    for (const file of files) {
      const destPath = path.join(file.destination, file.filename);
      console.log(destPath, "destPath"); //得到当前跟路径
      Jimp.read(file.path).then((image) => {
        image
          .resize(640, Jimp.AUTO)
          .write(path.join(file.destination, `small_${file.filename}`));
        // 需要什么尺寸根据自己需要选择,这个暂时就一种吧
        // image
        //   .resize(1280, Jimp.AUTO)
        //   .write(path.join(file.destination, `oringe_${file.filename}`));
        // image
        //   .resize(320, Jimp.AUTO)
        //   .write(path.join(file.destination, `small_${file.filename}`));
      });
    }
    await next();
  } catch (error) {
    console.log("压缩图片错误", error);
  }
};
module.exports = {
  avaterHandler,
  pictureHandler,
  pictureResize,
};

// 上传动态图片
