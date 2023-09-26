import { BaseDAO } from '#dao/BaseDAO.js';
import { Model } from '#dao/blog/model/ArticleTagModel.js';

/**
 * ArticleTag数据访问
 *
 * @extends {BaseDAO<typeof Model>}
 */
class ArticleTagDAO extends BaseDAO {}

const articleTagDAO = new ArticleTagDAO(Model);
export { ArticleTagDAO, articleTagDAO };
