// 导入必要的模块
const mongoose = require('mongoose');
const path = require('path');

// 加载环境变量配置
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});

// mongoose实例初始化为null
let mongooseInstance = null;

// 根据环境变量判断是否启用MongoDB
if (process.env.MONGODB_SWITCH === 'true') {
    mongooseInstance = mongoose;

    // 检查MongoDB连接URI是否已配置
    if (!process.env.MONGODB_URI) {
        console.error('MongoDB连接URI未设置，请检查 .env 文件');
        process.exit(1);
    }

    // 建立MongoDB连接
    // 使用环境变量中的URI和数据库名称
    mongoose.connect(process.env.MONGODB_URI + process.env.DB_NAME, {
            useNewUrlParser: true, // 使用新的URL解析器
            useUnifiedTopology: true // 使用新的拓扑引擎
        })
        .then(() => console.log('MongoDB连接成功'))
        .catch(err => console.log('MongoDB连接失败:', err));

    // 设置数据库连接的事件监听器
    const db = mongoose.connection;// 获取数据库连接实例
    db.on('error', console.error.bind(console, 'MongoDB连接错误:')); // 监听错误事件
    db.once('open', function() { // 监听连接成功事件
        console.log("MongoDB数据库连接成功!");
    });
} else {
    // MongoDB功能未启用时的处理
    console.log('MongoDB功能未启用，跳过数据库连接');
}

// 导出mongoose实例，供其他模块使用
module.exports = mongooseInstance;
