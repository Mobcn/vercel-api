import VHandler, { JWT } from '#handler';
import { settingService } from '#service/blog/SettingService.js';

/**
 * 获取所有设置
 */
export default VHandler.buildGET(
    /**
     * @param {import('#handler').VercelRequest} request
     */
    async ({}, request) => {
        const authorization = request.headers['authorization'];
        if (authorization?.startsWith('Bearer ')) {
            const token = authorization.replace('Bearer ', '');
            try {
                /** @type {import('#dao/blog/model/UserModel').User} */
                const user = JWT.verify(token);
                return await settingService.list({ isPublic: !user.is_admin });
            } catch (error) {}
        }
        return settingService.list();
    }
);
