const { getCaptcha } = require("./../uitls/tools");
const sendCode = async (ctx, next) => {
  const picCode = getCaptcha();
  console.log("验证码为:", picCode.text);
  // 将验证码保存入 session 中，与点击登录按钮之后，同用户输入的验证码进行比对
  ctx.session.code = picCode.text; //无法加载上
  // 指定返回的类型s
  ctx.response.type = "image/svg+xml";
  ctx.body = picCode.data;
};
module.exports = {
  sendCode,
};
