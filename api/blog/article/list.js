import VHandler from '#handler';
import { articleService } from '#service/blog/ArticleService.js';

/**
 * 获取文章列表
 */
export default VHandler.buildGET(
    /**
     * @param {Object} param0 请求参数
     * @param {string} [param0.key] 模糊匹配key（匹配title、description、content）
     * @param {string} [param0.startTime] 创建时间起始
     * @param {string} [param0.endTime] 创建时间终止
     * @param {string} [param0.categories] 分类
     * @param {string} [param0.tags] 标签
     * @param {string} [param0.author] 作者
     * @param {string} [param0.page] 分页
     * @param {string} [param0.limit] 每页数据条数
     */
    async ({ key, startTime, endTime, categories, tags, author, page, limit }) => {
        categories && (categories = categories.split(','));
        tags && (tags = tags.split(','));
        return await articleService.list({ key, startTime, endTime, categories, tags, author, page, limit });
    }
);
