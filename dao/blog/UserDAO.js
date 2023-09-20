import { BaseDAO } from '#dao/BaseDAO.js';
import { Model } from '#dao/blog/model/UserModel.js';

/**
 * 用户数据访问
 *
 * @extends {BaseDAO<typeof Model>}
 */
class UserDAO extends BaseDAO {
    /**
     * 通过用户名获取用户
     *
     * @param {string} username 用户名
     */
    async getByUsername(username) {
        return await this.Model.findOne({ username }).exec();
    }
}

const userDAO = new UserDAO(Model);
export { UserDAO, userDAO };
