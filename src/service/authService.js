// 数据库查询权限封装
const connect = require("./../app/database");
class AuthService {
  async checkResource(data) {
    const { tableName, dataId, user_id } = data;
    const statement = `SELECT * FROM ${tableName} WHERE id= ? AND user_id= ?;`;
    const [result] = await connect.execute(statement, [dataId, user_id]);
    return result.length > 0;
  }
}
module.exports = new AuthService();
