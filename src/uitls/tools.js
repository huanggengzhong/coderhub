const crypto = require("crypto");
// 利用node中的crypto进行密码加密
const md5Password = (password) => {
  const md5 = crypto.createHash("md5");
  const result = md5.update(password).digest("hex");
  return result;
};
module.exports = {
  md5Password,
};
