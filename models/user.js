// 引入mongoose模块
const mongoose = require('../db/mongoose');

// 定义用户模型的Schema（数据结构）
const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId, // MongoDB的唯一标识符类型
        auto: true    // 自动生成_id
    },
    username: {
        type: String,    // 用户名，字符串类型
        required: true,  // 必填项
        unique: true,    // 用户名不能重复
    },
    email: {
        type: String,    // 邮箱，字符串类型
        required: true,  // 必填项
        unique: true     // 邮箱不能重复
    },
    password: {
        type: String,    // 密码，字符串类型
        required: true   // 必填项
    },
    createdAt: {
        type: Date,      // 创建时间，日期类型
        default: Date.now // 默认值为当前时间
    }
});

// 导出用户模型
// 第一个参数'User'是模型名称，会自动对应数据库中的users集合
// 第二个参数userSchema是上面定义的数据结构
module.exports = mongoose.model('User', userSchema);
