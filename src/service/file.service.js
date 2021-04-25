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
  async createCosfile(data) {
    const statement = `INSERT INTO cosfile (filename,mimetype,size,user_id) VALUES(?,?,?,?);`;
    // console.log(data, "data");
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
  async createFile(data) {
    const statement = `INSERT INTO file (filename,mimetype,size,user_id,moment_id) VALUES (?,?,?,?,?);`;
    const [result] = await connect.execute(statement, [
      data.filename,
      data.mimetype,
      data.size,
      data.id,
      data.momentId,
    ]);
    return result;
  }
  async getFileByFilename(name) {
    const statement = `SELECT * from file WHERE filename='?';`;
    const [result] = await connect.execute(statement, [name]);
    return result;
  }
}
module.exports = new FileService();
