import { BaseDAO } from '#dao/BaseDAO.js';
import { Model } from '#dao/blog/model/ArticleModel.js';

/**
 * Article数据访问
 *
 * @extends {BaseDAO<typeof Model>}
 */
class ArticleDAO extends BaseDAO {}

const articleDAO = new ArticleDAO(Model);
export { ArticleDAO, articleDAO };
