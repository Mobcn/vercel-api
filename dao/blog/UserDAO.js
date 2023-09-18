import { BaseDAO } from '#dao/BaseDAO.js';
import { Model } from '#dao/blog/model/UserModel.js';

/**
 * 用户数据访问
 *
 * @extends BaseDAO<Model>
 */
class UserDAO extends BaseDAO {}

const userDAO = new UserDAO(Model);
export { UserDAO, userDAO };
