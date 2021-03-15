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
}

module.exports = new UserService();
