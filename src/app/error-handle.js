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

    default:
      break;
  }

  ctx.status = status;
  ctx.body = {
    code: status,
    message,
  };
};
module.exports = errorHandle;
