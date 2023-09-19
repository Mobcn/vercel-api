import { BaseService } from '#service/BaseService.js';
import { userDAO } from '#dao/blog/UserDAO.js';

/** @typedef {import('#dao/blog/UserDAO').UserDAO} DAO */
/** @typedef {import('#service/BaseService').ExtractModel<DAO>} Model */

/**
 * @extends {BaseService<DAO, Model>}
 */
class UserService extends BaseService {
    /**
     * 注册
     * 
     * @param {string} username 用户名
     * @param {string} password 密码
     */
    async register(username, password) {
        return await userService.save({ nickname: username, username, password });
    }
}

const userService = new UserService(userDAO);
export { UserService, userService };
