// 数据库操作写在这里
const connnection = require("./../app/database");

class UserService {
  // 创建用户
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO user (name,password) VALUES(?,?);`;
    const result = await connnection.execute(statement, [name, password]);
    return result[0];
  }
  //查询用户
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name=?;`;
    const result = await connnection.execute(statement, [name]);
    return result[0]; //取数组第一个
  }
  // 用户头像更新
  async updateAvaterUrlById(url, id) {
    const statement = `UPDATE user SET avater_url =? WHERE id=?;`;
    const [result] = await connnection.execute(statement, [url, id]);
    return result;
  }
}

module.exports = new UserService();
