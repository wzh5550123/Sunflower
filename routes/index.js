// 导入 Express 框架
var express = require('express');
// 创建路由实例
var router = express.Router();

/* 处理根路径的 GET 请求
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一个中间件函数
 */
router.get('/', function(req, res, next) {
  // 渲染 index 视图，并传入标题参数
  res.render('index', { title: 'Express' });
});

// 导出路由模块供其他文件使用
module.exports = router;
