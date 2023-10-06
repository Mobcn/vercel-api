import { BaseService } from '#service/BaseService.js';
import { tagDAO } from '#dao/blog/TagDAO.js';

/** @typedef {import('#dao/blog/TagDAO').TagDAO} DAO */
/** @typedef {import('#service/BaseService').ExtractModel<DAO>} Model */

/**
 * Tag服务
 *
 * @extends {BaseService<DAO, Model>}
 */
class TagService extends BaseService {
    /**
     * 获取articleTagDAO
     */
    static async getArticleTagDAO() {
        const { articleTagDAO } = await import('#dao/blog/ArticleTagDAO.js');
        return articleTagDAO;
    }

    /**
     * 删除主键ID对应的标签
     *
     * @param {string} id 主键ID
     */
    async removeById(id) {
        const articleTagDAO = await TagService.getArticleTagDAO();
        if (await articleTagDAO.exists({ tag: id })) {
            throw new Error('该标签下有文章，不能删除');
        }
        return await this.DAO.deleteById(id);
    }

    /**
     * 批量删除主键ID对应的数据
     *
     * @param {string[]} ids 主键ID数组
     */
    async removeByIds(ids) {
        const articleTagDAO = await TagService.getArticleTagDAO();
        const articleTagList = await articleTagDAO.list({ filter: { tag: { $in: ids } } });
        if (articleTagList.length > 0) {
            const tagList = await tagDAO.list({
                _id: { $in: Array.from(new Set(articleTagList.map((item) => item.tag))) }
            });
            throw new Error(`标签[${tagList.map((item) => item.name).join(',')}]下有文章，不能删除`);
        }
        return await this.DAO.delete({ _id: { $in: ids } });
    }
}

const tagService = new TagService(tagDAO);
export { TagService, tagService };
