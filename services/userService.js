// 导入用户模型
const { User } = require('../models/index.js');

/**
 * 用户服务模块 - 提供用户相关的数据库操作服务
 */

// 创建新用户
// @param userData {Object} 用户数据对象，包含 username、email、password
// @return {Promise<Object>} 返回创建的用户对象
const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        throw error;
    }
};

// 根据用户名查找用户
// @param username {string} 用户名
// @return {Promise<Object|null>} 返回用户对象，如果未找到则返回null
const findUserByUsername = async (username) => {
    try {
        return await User.findOne({ username });
    } catch (error) {
        throw error;
    }
};

// 根据邮箱查找用户
// @param email {string} 用户邮箱
// @return {Promise<Object|null>} 返回用户对象，如果未找到则返回null
const findUserByEmail = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        throw error;
    }
};

// 更新用户信息
// @param userId {string} 用户ID
// @param updateData {Object} 要更新的用户数据
// @return {Promise<Object|null>} 返回更新后的用户对象
const updateUser = async (userId, updateData) => {
    try {
        // 使用 { new: true } 选项返回更新后的文档
        return await User.findByIdAndUpdate(userId, updateData, { new: true });
    } catch (error) {
        throw error;
    }
};

// 删除用户
// @param userId {string} 要删除的用户ID
// @return {Promise<Object|null>} 返回被删除的用户对象
const deleteUser = async (userId) => {
    try {
        return await User.findByIdAndDelete(userId);
    } catch (error) {
        throw error;
    }
};

// 导出所有用户服务函数
module.exports = {
    createUser,        // 创建新用户
    findUserByUsername,// 根据用户名查找用户
    findUserByEmail,   // 根据邮箱查找用户
    updateUser,        // 更新用户信息
    deleteUser,        // 删除用户
};
