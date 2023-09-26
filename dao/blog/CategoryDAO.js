import { BaseDAO } from '#dao/BaseDAO.js';
import { Model } from '#dao/blog/model/CategoryModel.js';

/**
 * Category数据访问
 *
 * @extends {BaseDAO<typeof Model>}
 */
class CategoryDAO extends BaseDAO {}

const categoryDAO = new CategoryDAO(Model);
export { CategoryDAO, categoryDAO };
