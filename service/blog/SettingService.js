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
     * 获取所有配置
     *
     * @param {Object} [param0] 参数
     * @param {boolean} [param0.isPublic=true] 是否为公告配置
     */
    async list({ isPublic = true }) {
        const settingList = await this.DAO.list({ filter: { is_public: isPublic } });
        return settingList.map((item) => ({ key: item.key, value: item.value }));
    }

    /**
     * 获取配置分页列表
     *
     * @param {Object} param0 参数
     * @param {number} [param0.page] 页数
     * @param {number} [param0.limit] 每页数据条数
     * @param {boolean} [param0.isPublic=true] 是否为公告配置
     */
    async page({ page, limit, isPublic = true }) {
        const { list: settingList, total } = await this.DAO.page({ filter: { is_public: isPublic }, page, limit });
        return {
            list: settingList.map((item) => ({ key: item.key, value: item.value })),
            total
        };
    }
}

const settingService = new SettingService(settingDAO);
export { SettingService, settingService };
