const connect = require("./../app/database");
class FileService {
  async createAvater(data) {
    const statement = `INSERT INTO avater (filename,mimetype,size,user_id) VALUES(?,?,?,?);`;
    const [result] = await connect.execute(statement, [
      data.filename,
      data.mimetype,
      data.size,
      data.id,
    ]);
    return result;
  }
  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avater WHERE user_id=?;`;
    const [result] = await connect.execute(statement, [userId]);
    return result.pop(); //永远取最新的
  }
}
module.exports = new FileService();
