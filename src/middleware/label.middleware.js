const service = require("./../service/label.service");
const types = require("./../constants/error-types");

// 验证标签是否存在
const verifyLabelExists = async (ctx, next) => {
  //1.获取标签,比如:[ '前端', '编程语言', 'C语言' ]
  const { labels } = ctx.request.body;

  //2.判断标签是否存在
  let newLabels = [];
  for (let name of labels) {
    let label = { name }; //增加一个name属性
    const labelResult = await service.getLabelByName(name);
    if (labelResult.length === 0) {
      //没有直接新增
      const result = await service.create(name);
      // console.log(result, "result6666");
      label.id = result.insertId;
    } else {
      label.id = labelResult[0].id;
    }
    newLabels.push(label);
  }
  ctx.labels = newLabels; //动态添加到上下文对象里
  await next();
};

module.exports = {
  verifyLabelExists,
};
