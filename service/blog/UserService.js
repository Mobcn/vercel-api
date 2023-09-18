import { BaseService } from '#service/BaseService.js';
import { UserDAO, userDAO } from '#dao/blog/UserDAO.js';

/**
 * @extends BaseService<UserDAO,import('#service/BaseService.js').ExtractModel<UserDAO>>
 */
class UserService extends BaseService {}

const userService = new UserService(userDAO);
export { UserService, userService };
