import { BaseService } from '#service/BaseService.js';
import { settingDAO } from '#dao/blog/SettingDAO.js';

/** @typedef {import('#dao/blog/SettingDAO').SettingDAO} DAO */
/** @typedef {import('#service/BaseService').ExtractModel<DAO>} Model */

/**
 * Setting服务
 *
 * @extends {BaseService<DAO, Model>}
 */
class SettingService extends BaseService {
    /**
     * @param {boolean} isPublic 是否为公告配置
     */
    async list(isPublic = true) {
        const settingList = await this.DAO.list({ filter: { is_public: isPublic }, limit: 99999999 });
        return settingList.map((item) => ({ key: item.key, value: item.value }));
    }
}

const settingService = new SettingService(settingDAO);
export { SettingService, settingService };
