import { BaseService } from '#service/BaseService.js';
import { articleDAO } from '#dao/blog/ArticleDAO.js';
import { articleTagDAO } from '#dao/blog/ArticleTagDAO.js';

/** @typedef {import('#dao/blog/ArticleDAO').ArticleDAO} DAO */
/** @typedef {import('#service/BaseService').ExtractModel<DAO>} Model */

/**
 * Article服务
 *
 * @extends {BaseService<DAO, Model>}
 */
class ArticleService extends BaseService {
    /**
     * 获取文章列表
     *
     * @param {Object} param0 查询参数
     * @param {string} [param0.key] 模糊匹配key（匹配title、description、content）
     * @param {string} [param0.startTime] 创建时间起始
     * @param {string} [param0.endTime] 创建时间终止
     * @param {string[]} [param0.categories] 分类
     * @param {string[]} [param0.tags] 标签
     * @param {string} [param0.page] 分页
     * @param {string} [param0.limit] 每页数据条数
     */
    async list({ key, startTime, endTime, categories, tags, page, limit }) {
        const condition = [];
        if (tags?.length > 0) {
            const articleIds = (await articleTagDAO.list({ filter: { tag: { $in: tags } } })).map(
                (item) => item.article
            );
            if (articleIds.length <= 0) {
                return [];
            }
            condition.push({ _id: { $in: articleIds } });
        }
        if (key) {
            condition.push({
                $or: [{ title: new RegExp(key) }, { description: new RegExp(key) }, { content: new RegExp(key) }]
            });
        }
        startTime && condition.push({ create_time: { $gte: startTime } });
        endTime && condition.push({ create_time: { $lte: endTime } });
        categories && condition.push({ category: { $in: categories } });
        return await articleDAO.list({ filter: condition.length > 0 ? { $and: condition } : undefined, page, limit });
    }

    /**
     * 添加
     *
     * @param {Object} param0 参数
     * @param {string} param0.title 标题
     * @param {string} [param0.description] 描述
     * @param {string} [param0.content] 内容
     * @param {string} [param0.cover] 封面
     * @param {string} [param0.category] 分类
     * @param {string[]} [param0.tags] 标签
     */
    async save({ title, description, content, cover, category, tags }) {
        // 添加文章
        const result = await this.DAO.insert({ title, description, content, cover, category });

        // 添加标签关联
        if (tags?.length > 0) {
            await Promise.all(tags.map((tag) => articleTagDAO.insert({ article: result._id, tag })));
        }

        return result;
    }
}

const articleService = new ArticleService(articleDAO);
export { ArticleService, articleService };
