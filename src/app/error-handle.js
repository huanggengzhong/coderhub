const types = require("./../constants/error-types");
const errorHandle = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case types.NAME_OR_PASSWORD_NULL:
      status = 400;
      message = "用户名或者密码不能为空";
      break;
    case types.NAME_ALREADY_EXISTS:
      status = 409;
      message = "用户名已存在,无法注册";
      break;
    case types.USER_DOES_NOT_EXISTS:
      status = 400;
      message = "用户不存在,请先注册";
      break;
    case types.NAME_OR_PASSWORD_ERROR:
      status = 400;
      message = "用户or密码错误";
      break;
    case types.UNAUTHORIZATION:
      status = 400;
      message = "缺少token";
      break;
    case types.CONTENT_NOT_EXISTS:
      status = 400;
      message = "内容不能为空";
      break;
    case types.ERROR_AUTHORIZATION:
      status = 400;
      message = "无效的token";
      break;
    case types.NO_DATA_EDIT_AUTH:
      status = 401;
      message = "授权失败";
      break;
    case types.LABEL_DATA_EXIST:
      status = 409;
      message = "标签已存在,请换一个标签名";
      break;
    case types.PICCODE_ERROR:
      status = 400;
      message = "验证码不正确";
      break;
    default:
      status = 500;
      message = "操作异常";
      break;
  }
  ctx.status = status;
  ctx.body = {
    code: status,
    message,
  };
};
module.exports = errorHandle;
