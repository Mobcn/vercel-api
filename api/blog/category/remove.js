import VHandler, { Result } from '#handler';
import { categoryService } from '#service/blog/CategoryService.js';

/**
 * 删除分类
 */
export default VHandler.buildPOSTAndAuth(
    /**
     * @param {Object} param0 请求参数
     * @param {string} param0._id 文章ID
     * @param {import('#dao/blog/model/UserModel').User} param0.__token_data__ token携带用户数据
     */
    async ({ _id, __token_data__ }) => {
        if (!__token_data__.is_admin) {
            throw new Error('没有权限!');
        }
        await categoryService.removeById(_id);
        Result.success({ message: '删除成功!' });
    }
);
