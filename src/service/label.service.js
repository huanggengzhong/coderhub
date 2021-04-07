const connect = require("./../app/database");
class LabelService {
  async create(content) {
    const statement = `INSERT INTO label (name) VALUES (?);`;
    const [result] = await connect.execute(statement, [content]);
    console.log(result, "labelresult");
    return result;
  }
  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name= ?;`;
    const [result] = await connect.execute(statement, [name]);
    return result;
  }
  async getLabels(data) {
    const statement = `SELECT * FROM label LIMIT ${data.offset},${data.size};`;
    const [result] = await connect.execute(statement, []);
    return result;
  }
}
module.exports = new LabelService();
