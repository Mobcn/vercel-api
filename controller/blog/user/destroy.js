import VHandler, { Result } from '#handler';
import { userService } from '#service/blog/UserService.js';

/**
 * 用户删除
 */
export default VHandler.buildPOSTAndAuth(
    /**
     * @param {Object} param0 请求参数
     * @param {string} param0.id 主键ID
     */
    async ({ _id }) => {
        await userService.destroy(_id);
        return Result.success({ message: '删除成功!' });
    }
);
