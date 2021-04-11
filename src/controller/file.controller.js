const fileService = require("./../service/file.service.js");
const UserService = require("./../service/user.service.js");

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
}
module.exports = new FileController();
