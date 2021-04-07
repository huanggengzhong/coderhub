const connect = require("./../app/database");
class CommentService {
  async create(data) {
    const { content, moment_id, id } = data;
    const statement = `INSERT into comment (content,moment_id,user_id) VALUES(?,?,?);`;
    const [result] = await connect.execute(statement, [content, moment_id, id]);
    return result;
  }
  async reply(momentId, content, id, commentId) {
    const statement = `INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES(?,?,?,?);`;
    const [result] = await connect.execute(statement, [
      content,
      momentId,
      id,
      commentId,
    ]);
    return result;
  }
  async update(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id=?;`;
    const [result] = await connect.execute(statement, [content, commentId]);
    return result;
  }
  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id=?`;
    const [result] = await connect.execute(statement, [commentId]);
    return result;
  }
  async list() {}
}
module.exports = new CommentService();
