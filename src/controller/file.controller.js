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
}
module.exports = new FileController();
