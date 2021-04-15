const crypto = require("crypto");
const SvgCaptcha = require("svg-captcha");

//返回SVG图片验证码
const getCaptcha = () => {
  const captcha = SvgCaptcha.create({
    size: 4, // 个数
    width: 100, // 宽
    height: 30, // 高
    fontSize: 38, // 字体大小
    color: true, // 字体颜色是否多变
    noise: 1, // 干扰线几条
    background: "#f9ac19", // 背景色
  });

  return captcha;
};

// 利用node中的crypto进行密码加密
const md5Password = (password) => {
  const md5 = crypto.createHash("md5");
  const result = md5.update(password).digest("hex");
  return result;
};
module.exports = {
  md5Password,
  getCaptcha,
};
