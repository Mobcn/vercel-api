import { BaseService } from '#service/BaseService.js';
import { articleDAO } from '#dao/blog/ArticleDAO.js';

/** @typedef {import('#dao/blog/ArticleDAO').ArticleDAO} DAO */
/** @typedef {import('#service/BaseService').ExtractModel<DAO>} Model */

/**
 * Article服务
 * 
 * @extends {BaseService<DAO, Model>}
 */
class ArticleService extends BaseService {}

const articleService = new ArticleService(articleDAO);
export { ArticleService, articleService };
