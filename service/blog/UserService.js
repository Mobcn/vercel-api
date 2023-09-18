import BaseService from '#service/BaseService.js';
import UserDAO, { userDAO } from '#dao/blog/UserDAO.js';
import UserModel, { UserSchema } from '#dao/blog/model/UserModel.js';

/**
 * @extends {BaseService<UserDAO, UserModel, UserSchema>}
 */
class UserService extends BaseService {}

export const userService = new UserService(userDAO);
export default UserService;
