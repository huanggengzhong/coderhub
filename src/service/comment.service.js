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
  async getCommentsByMomentId(momentId) {
    const statement = `SELECT  m.id,m.content,m.comment_id commentId,m.creatAt cteateTime,
    JSON_OBJECT('id',u.id,'name',u.name) user
    from comment m
    LEFT JOIN user u ON u.id=m.user_id
    WHERE moment_id=?;`;
    // console.log(momentId, "momentId444");
    const [result] = await connect.execute(statement, [momentId]);
    // console.log(result, "result");
    return result;
  }
}
module.exports = new CommentService();
