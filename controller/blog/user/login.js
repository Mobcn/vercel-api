import VHandler, { JWT, Result } from '#handler';
import { userService } from '#service/blog/UserService.js';

/**
 * 用户登录
 */
export default VHandler.buildPOST(
    /**
     * @param {Object} param0 请求参数
     * @param {string} param0.username 用户名
     * @param {string} param0.password 密码
     * @param {import('#handler').VercelRequest} request
     */
    async ({ username, password }, request) => {
        let resultToken;
        const authorization = request.headers['authorization'];
        if (authorization?.startsWith('Bearer ')) {
            const token = authorization.replace('Bearer ', '');
            try {
                JWT.verify(token);
                resultToken = token;
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    const expiredTime = Date.now() - error.expiredAt.getTime();
                    // 过期时间小于7天则刷新token
                    if (expiredTime < 7 * 24 * 60 * 60 * 1000) {
                        resultToken = JWT.sign(JWT.verify(token, true));
                    }
                }
            }
        }
        if (!resultToken) {
            const user = await userService.login(username, password);
            resultToken = JWT.sign(user.toJSON());
        }
        return Result.success({ message: '登录成功!', data: { token: resultToken } });
    }
);
