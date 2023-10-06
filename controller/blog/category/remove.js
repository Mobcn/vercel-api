import VHandler, { Result } from '#handler';
import { categoryService } from '#service/blog/CategoryService.js';

/**
 * 删除分类
 */
export default VHandler.buildPOSTAndAuth(
    /**
     * @param {Object} param0 请求参数
     * @param {string} param0._id 主键ID
     * @param {import('#dao/blog/model/UserModel').User} param0.__token_data__ token携带用户数据
     */
    async ({ _id, __token_data__ }) => {
        if (!__token_data__.is_admin) {
            throw new Error('没有权限!');
        }
        const ids = _id.split(',');
        let result;
        if (ids.length === 1) {
            result = await categoryService.removeById(_id);
        } else {
            result = await categoryService.removeByIds(ids);
        }
        return Result.success({ message: '删除成功!', data: result });
    }
);
