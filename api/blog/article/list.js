import VHandler from '#handler';
import { articleService } from '#service/blog/ArticleService.js';

/**
 * 获取文章列表
 */
export default VHandler.buildGET(
    /**
     * @param {Object} param0 查询参数
     * @param {string | undefined} param0.key 模糊匹配key（匹配title、description、content）
     * @param {string | undefined} param0.startTime 创建时间起始
     * @param {string | undefined} param0.endTime 创建时间终止
     * @param {string | undefined} param0.categories 分类
     * @param {string | undefined} param0.tags 标签
     * @param {string | undefined} param0.page 分页
     * @param {string | undefined} param0.limit 每页数据条数
     */
    async ({ key, startTime, endTime, categories, tags, page, limit }) => {
        categories && (categories = categories.split(','));
        tags && (tags = tags.split(','));
        return await articleService.list({ key, startTime, endTime, categories, tags, page, limit });
    }
);
