const connect = require("./../app/database");
const { APP_HOST, APP_PORT } = require("./../app/config");
class MomentService {
  // 创建动态
  async create(data) {
    const { content, user_id } = data;
    const statement = "INSERT INTO moment (content,user_id) VALUES (?,?);";
    const result = await connect.execute(statement, [content, user_id]);
    return result[0];
  }
  // 某一条动态明细
  async detail(id) {
    const statement = `
    SELECT 
    m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT('id', u.id, 'name', u.name) author,
    IF(COUNT(l.id),JSON_ARRAYAGG(
      JSON_OBJECT('id', l.id, 'name', l.name)
    ),NULL) labels,
    (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
      JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.creatAt,
                  'user', JSON_OBJECT('id', cu.id, 'name', cu.name))
    ),NULL) FROM comment c LEFT JOIN user cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments,
    (SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/moment/images/',file.filename)) FROM file where m.id=file.moment_id) images
  FROM moment m
  LEFT JOIN user u ON m.user_id = u.id
  LEFT JOIN moment_label ml ON m.id = ml.moment_id
  LEFT JOIN label l ON ml.label_id = l.id
  WHERE m.id = ?
  GROUP BY m.id;  
    `;
    // 使用了JSON_ARRAYAGG,一定要分组
    // const statement = `SELECT m.id id,m.content content ,m.createAt createTime,m.updateAt updateTime,
    //   JSON_OBJECT('id',u.id,'name',u.name) author,

    //   FROM moment m
    //   LEFT JOIN user u ON m.user_id=u.id
    //   WHERE m.id=?;`;
    // const statement = "SELECT * FROM moment m WHERE m.id=?;";
    const result = await connect.execute(statement, [id]);
    console.log(result, "result");
    return result[0];
  }
  // 动态列表
  async getList(data) {
    console.log(data.offset, data.size, "data");
    try {
      const statement = `
      SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name,'avater',u.avater_url) author,
      (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
      (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
      (SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/moment/images/',file.filename)) FROM file where m.id=file.moment_id) images
    FROM moment m
    LEFT JOIN user u ON m.user_id = u.id
      LIMIT ${data.offset},${data.size};`;
      const result = await connect.execute(statement, []); //分页查询要写在sql语句中,不然有bug
      // const result = await connect.execute(statement, [data.size, data.offset]);
      // console.log(result, "result");
      return result[0];
    } catch (error) {
      console.log(error);
    }
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
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id=? AND label_id=?;`;
    const [result] = await connect.execute(statement, [momentId, labelId]);
    return result[0] ? true : false;
  }
  async addLabel(momentId, labelId) {
    // console.log(momentId, labelId, "momentId, labelId");
    const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);`;
    const [result] = await connect.execute(statement, [momentId, labelId]);
    return result;
  }
}
module.exports = new MomentService();
