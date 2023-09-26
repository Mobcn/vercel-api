import { BaseService } from '#service/BaseService.js';
import { articleTagDAO } from '#dao/blog/ArticleTagDAO.js';

/** @typedef {import('#dao/blog/ArticleTagDAO').ArticleTagDAO} DAO */
/** @typedef {import('#service/BaseService').ExtractModel<DAO>} Model */

/**
 * ArticleTag服务
 * 
 * @extends {BaseService<DAO, Model>}
 */
class ArticleTagService extends BaseService {}

const articleTagService = new ArticleTagService(articleTagDAO);
export { ArticleTagService, articleTagService };
