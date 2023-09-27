import VHandler from '#handler';
import { articleService } from '#service/blog/ArticleService.js';

/**
 * 获取文章
 */
export default VHandler.buildGET(
    /**
     * @param {Object} param0 请求参数
     * @param {string} param0._id 文章ID
     */
    async ({ _id }) => await articleService.getById(_id)
);
