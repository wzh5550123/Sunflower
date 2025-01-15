//===============================
// 导入所需模块
//===============================

// 核心模块导入
const createError = require('http-errors'); // 创建HTTP错误
const express = require('express'); // Express框架
const path = require('path'); // 路径处理
const cookieParser = require('cookie-parser'); // Cookie解析
const logger = require('morgan'); // 日志记录
const cors = require('cors'); // CORS中间件，解决跨域问题

//===============================
// 引入环境变量配置
//===============================

require('dotenv').config({
    path: path.resolve(__dirname, '.env')
}); // 引入环境变量

//===============================
// 路由模块导入
//===============================

const indexRouter = require('./routes/index'); // 主页路由
const usersRouter = require('./routes/users'); // 用户路由

//===============================
// Express应用配置
//===============================

const app = express(); // 创建Express实例

// 视图引擎配置
app.set('views', path.join(__dirname, 'views')); // 设置视图目录
app.engine('html', require('ejs').renderFile); // 设置HTML引擎
app.set('view engine', 'html'); // 将默认引擎设置为HTML

//===============================
// 中间件配置
//===============================

app.use(cors()); // 添加CORS中间件，解决跨域问题
// ! 这是直接全部放行，若要考虑安全性，需要自定义CORS策略，如下 ↓
/** 
 * CORS配置示例
 * 如需自定义CORS策略，可解开注释并修改以下配置:
 * 
 * app.use(cors({
 *   origin: 'http://example.com',           // 允许的域名
 *   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的HTTP方法
 *   allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
 * }));
 */
app.use(logger('dev')); // 开发环境日志
app.use(express.json()); // JSON解析
app.use(express.urlencoded({ extended: false })); // URL编码解析
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

//===============================
// 环境变量验证
//===============================

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