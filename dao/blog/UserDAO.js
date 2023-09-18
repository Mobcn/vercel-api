import BaseDAO from '#dao/BaseDAO.js';
import UserModel, { UserSchema } from '#dao/blog/model/UserModel.js';

/**
 * 用户数据访问
 *
 * @extends BaseDAO<UserModel,UserSchema>
 */
class UserDAO extends BaseDAO {}

export const userDAO = new UserDAO(UserModel);
export default UserDAO;
