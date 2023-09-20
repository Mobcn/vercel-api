import VHandler, { Result } from '#handler';
import { userService } from '#service/blog/UserService.js';

/**
 * 注册用户
 */
export default VHandler.buildPOST(
    /**
     * @param {Object} param0 请求参数
     * @param {string} param0.username 用户名
     * @param {string} param0.password 密码
     */
    async ({ username, password }) => {
        if (!username) {
            throw new Error('username不能为空!');
        }
        if (!password) {
            throw new Error('password不能为空!');
        }
        await userService.register(username, password);
        return Result.success({ message: '注册成功!' });
    }
);
