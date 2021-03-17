const connect = require("./../app/database");
class MomentService {
  async create(data) {
    const { content, user_id } = data;
    const statement = "INSERT INTO moment (content,user_id) VALUES (?,?);";
    const result = await connect.execute(statement, [content, user_id]);
    return result[0];
  }
}
module.exports = new MomentService();
