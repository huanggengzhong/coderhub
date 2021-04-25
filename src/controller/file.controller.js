const fileService = require("./../service/file.service.js");
const UserService = require("./../service/user.service.js");
const config = require("./../app/config.js");
const fs = require("fs");
var COS = require("cos-nodejs-sdk-v5");

const { APP_HOST, APP_PORT } = require("./../app/config");
class FileController {
  async saveAvatarInfo(ctx, next) {
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;
    // 将头像信息保存在数据库中
    const result = await fileService.createAvater({
      filename,
      mimetype,
      size,
      id,
    });

    const avaterUrl = `${APP_HOST}:${APP_PORT}/user/${id}/avater`; //符合refs风格的头像接口路径

    // 将头像信息保存在user表中
    const result2 = await UserService.updateAvaterUrlById(avaterUrl, id);

    if (result && result2) {
      ctx.body = {
        code: 200,
        url: avaterUrl,
        message: "新头像上传成功",
      };
    }
  }
  async savePictureInfo(ctx, next) {
    try {
      const files = ctx.req.files;
      const { momentId } = ctx.query;
      // 将所有图片保存在数据库中
      const { id } = ctx.user;
      for (let file of files) {
        const { filename, mimetype, size } = file;
        await fileService.createFile({
          filename,
          mimetype,
          size,
          id,
          momentId,
        });
      }
      ctx.body = {
        code: 200,
        message: "动态配图上传完成",
      };
    } catch (error) {
      console.log("动态图片上传错误", error);
    }
  }
  async cosfile(ctx, next) {
    try {
      let url = "";
      const _ctx = ctx;
      const file = ctx.req.file;
      const res = await new Promise((resolve, reject) => {
        //用await new Promise()解决了body不返回数据的巨坑
        //增加cos上传
        var cos = new COS({
          SecretId: config.COS_SECRETID,
          SecretKey: config.COS_SECRETKEY,
        });
        // 分片上传
        cos.sliceUploadFile(
          {
            Bucket: "codehub-1258521833",
            Region: "ap-guangzhou",
            Key: `file/${file.filename}`,
            FilePath: file.path,
          },
          async function (err, data) {
            if (!err) {
              // console.log("文件上传成功2,回调地址:", data.Location);
              const { mimetype, size } = file;
              const { id } = ctx.user;
              // 将头像信息保存在数据库中
              const result = await fileService.createCosfile({
                filename: data.Location,
                mimetype,
                size,
                id,
              });
              if (result) {
                url = data.Location;
                // console.log(url, "上传文件成功");
                resolve(data.Location);
              }
            } else {
              console.log("cos错误", err);
              reject(err);
            }
          }
        );
      });
      _ctx.body = {
        status: 200,
        message: "cos上传文件成功",
        url: res,
      };
    } catch (error) {
      console.log("cos上传失败", error);
    }
  }
}
module.exports = new FileController();
