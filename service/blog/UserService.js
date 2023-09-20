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
        const user = await this.DAO.getByUsername(username);
        if (user) {
            throw new Error(`用户名[${username}]已存在!`);
        }
        return await this.save({ nickname: username, username, password });
    }

    /**
     * 登录
     *
     * @param {string} username 用户名
     * @param {string} password 密码
     */
    async login(username, password) {
        const user = await this.DAO.get({ username, password });
        if (!user) {
            throw new Error('用户名或密码错误!');
        }
        return user;
    }
}

const userService = new UserService(userDAO);
export { UserService, userService };
