import { BaseService } from '#service/BaseService.js';
import { categoryDAO } from '#dao/blog/CategoryDAO.js';

/** @typedef {import('#dao/blog/CategoryDAO').CategoryDAO} DAO */
/** @typedef {import('#service/BaseService').ExtractModel<DAO>} Model */

/**
 * Category服务
 * 
 * @extends {BaseService<DAO, Model>}
 */
class CategoryService extends BaseService {}

const categoryService = new CategoryService(categoryDAO);
export { CategoryService, categoryService };
