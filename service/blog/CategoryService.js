import { BaseService } from '#service/BaseService.js';
import { categoryDAO } from '#dao/blog/CategoryDAO.js';

/** @typedef {import('#dao/blog/CategoryDAO').CategoryDAO} DAO */
/** @typedef {import('#service/BaseService').ExtractModel<DAO>} Model */

/**
 * Category服务
 *
 * @extends {BaseService<DAO, Model>}
 */
class CategoryService extends BaseService {
    /**
     * articleDAO
     */
    static async getArticleDAO() {
        const { articleDAO } = await import('#dao/blog/ArticleDAO.js');
        return articleDAO;
    }

    /**
     * 删除主键ID对应的数据
     *
     * @param {string} id 主键ID
     */
    async removeById(id) {
        const articleDAO = await CategoryService.getArticleDAO();
        if (await articleDAO.exists({ category: id })) {
            throw new Error('该分类下有文章，不能删除');
        }
        return await this.DAO.deleteById(id);
    }

    /**
     * 批量删除主键ID对应的数据
     *
     * @param {string[]} ids 主键ID数组
     */
    async removeByIds(ids) {
        const articleDAO = await CategoryService.getArticleDAO();
        const articleList = await articleDAO.list({ filter: { category: { $in: ids } } });
        if (articleList.length > 0) {
            const categoryList = await categoryDAO.list({
                filter: { _id: { $in: articleList.map((item) => item.category) } }
            });
            throw new Error(`分类[${categoryList.map((item) => item.name).join(',')}]下有文章，不能删除`);
        }
        return await this.DAO.delete({ _id: { $in: ids } });
    }
}

const categoryService = new CategoryService(categoryDAO);
export { CategoryService, categoryService };
