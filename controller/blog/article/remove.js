import VHandler, { Result } from '#handler';
import { articleService } from '#service/blog/ArticleService.js';

/**
 * 删除文章
 */
export default VHandler.buildPOSTAndAuth(
    /**
     * @param {Object} param0 请求参数
     * @param {string} param0._id 主键ID
     * @param {import('#dao/blog/model/UserModel').User} param0.__token_data__ token携带用户数据
     */
    async ({ _id, __token_data__ }) => {
        const result = await articleService.removeById(_id, __token_data__);
        return Result.success({ message: '删除成功!', data: result });
    }
);
