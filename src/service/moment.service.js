const connect = require("./../app/database");
class MomentService {
  // 创建动态
  async create(data) {
    const { content, user_id } = data;
    const statement = "INSERT INTO moment (content,user_id) VALUES (?,?);";
    const result = await connect.execute(statement, [content, user_id]);
    return result[0];
  }
  // 动态列表
  async getList(data) {
    try {
      const statement = `SELECT * FROM moment;`;
      const result = await connect.execute(statement, []);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
  // 某一条动态明细
  async detail(id) {
    const statement = "SELECT * FROM moment m WHERE m.id=?;";
    const result = await connect.execute(statement, [id]);
    return result[0];
  }
  // 修改动态
  async edit(id, content) {
    try {
      const statement = `UPDATE moment SET content=? WHERE id= ?;`;
      const result = await connect.execute(statement, [content, id]);
      return result;
    } catch (error) {
      throw new Error(error, "moment-edit");
    }
  }
  // 删除动态
  async delete(id) {
    try {
      const statement = `DELETE FROM moment WHERE id=?;`;
      const result = await connect.execute(statement, [id]);
      return result;
    } catch (error) {
      throw new Error(error, "moment-delete");
    }
  }
}
module.exports = new MomentService();
