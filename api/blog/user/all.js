import VHandler from '#handler';
import { userService } from '#service/blog/UserService.js';

/**
 * 获取所有用户
 */
export default VHandler.buildGETAndAuth(
    /**
     * @param {Object} param0 请求参数
     * @param {import('#dao/blog/model/UserModel').User} param0.__token_data__ token携带用户数据
     */
    async ({ __token_data__ }) => {
        if (!__token_data__.is_admin) {
            throw new Error('没有权限');
        }
        return await userService.listAll();
    }
);
