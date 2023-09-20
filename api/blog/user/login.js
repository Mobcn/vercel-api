import VHandler, { Result } from '#handler';
import { userService } from '#service/blog/UserService.js';

/**
 * 用户登录
 */
export default VHandler.buildPOST(
    /**
     * @param {Object} param0 请求参数
     * @param {*} param0.username 用户名
     * @param {*} param0.password 密码
     */
    async ({ username, password }) => {
        const user = await userService.login(username, password);
        return Result.success({ message: '登录成功!', data: user });
    }
);