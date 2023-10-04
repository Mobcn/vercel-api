import VHandler from '#handler';
import { settingService } from '#service/blog/SettingService.js';

/**
 * 获取设置列表
 */
export default VHandler.buildGET(
    /**
     * @param {Object} param0 请求参数
     * @param {string | number} [param0.page] 页数
     * @param {string | number} [param0.limit] 每页数据条数
     */
    async ({ page, limit }) => {
        page && (page = Number(page)) <= 0 && (page = undefined);
        limit && (limit = Number(limit)) <= 0 && (limit = undefined);
        const authorization = request.headers['authorization'];
        if (authorization?.startsWith('Bearer ')) {
            const token = authorization.replace('Bearer ', '');
            try {
                /** @type {import('#dao/blog/model/UserModel').User} */
                const user = JWT.verify(token);
                return await settingService.page({ page, limit, isPublic: !user.is_admin });
            } catch (error) {}
        }
        return await settingService.page({ page, limit });
    }
);
