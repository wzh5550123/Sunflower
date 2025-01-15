//===============================
// 导入所需模块
//===============================
// 核心模块导入
var createError = require('http-errors'); // 创建HTTP错误
var express = require('express'); // Express框架
var path = require('path'); // 路径处理
var cookieParser = require('cookie-parser'); // Cookie解析
var logger = require('morgan'); // 日志记录

//===============================
// 引入环境变量配置
//===============================
require('dotenv').config({
    path: path.resolve(__dirname, '.env')
}); // 引入环境变量

//===============================
// 路由模块导入
//===============================
// 路由模块导入
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//===============================
// Express应用配置
//===============================
// 创建Express实例
var app = express();

// 视图引擎配置
app.set('views', path.join(__dirname, 'views')); // 视图目录设置
app.engine('html', require('ejs').renderFile); // 设置html引擎
app.set('view engine', 'html'); // 将默认引擎设置为html


//===============================
// 中间件配置
//===============================
app.use(logger('dev')); // 开发环境日志
app.use(express.json()); // JSON解析
app.use(express.urlencoded({
    extended: false
})); // URL编码解析
app.use(cookieParser()); // Cookie解析
app.use(express.static(path.join(__dirname, 'public'))); // 静态文件服务


//===============================
// 路由配置
//===============================
app.use('/', indexRouter); // 主页路由
app.use('/users', usersRouter); // 用户路由


//===============================
// 错误处理配置
//===============================
// 404错误处理
app.use(function (req, res, next) {
    next(createError(404));
});

// 全局错误处理
app.use(function (err, req, res, next) {
    // 开发环境错误处理
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // 错误页面渲染
    res.status(err.status || 500);
    res.render('error');
});

// 在使用环境变量之前，添加验证
if (!process.env.PORT || !process.env.MONGODB_URI) {
    console.error('环境变量未正确加载，请检查 .env 文件');
    process.exit(1);
}

// 使用环境变量
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

//===============================
// MongoDB 配置与连接
//===============================
const mongoose = require('./db/mongoose');

//===============================
// 服务器启动
//===============================
// 启动服务器
app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});

//===============================
// 模块导出
//===============================
module.exports = {
    app,
    mongoose
};