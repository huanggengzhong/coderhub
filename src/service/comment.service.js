const connect = require("./../app/database");
class CommentService {
  async create(data) {
    const { content, moment_id, id } = data;
    const statement = `INSERT into comment (content,moment_id,user_id) VALUES(?,?,?);`;
    const [result] = await connect.execute(statement, [content, moment_id, id]);
    return result;
  }
}
module.exports = new CommentService();
