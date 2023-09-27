import VHandler, { Result } from '#handler';
import { categoryService } from '#service/blog/CategoryService.js';

/**
 * 保存分类
 */
export default VHandler.buildPOST(
    /**
     * @param {Object} param0 请求参数
     * @param {string} param0.name 名称
     * @param {string} param0.description 描述
     * @param {import('#dao/blog/model/UserModel').User} param0.__token_data__ token携带用户数据
     */
    async ({ name, description, __token_data__ }) => {
        if (!__token_data__.is_admin) {
            throw new Error('没有权限!');
        }
        const result = await categoryService.save({ name, description });
        return Result.success({ message: '保存成功!', data: result });
    }
);
