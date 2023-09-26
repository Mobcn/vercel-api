import { BaseService } from '#service/BaseService.js';
import { settingDAO } from '#dao/blog/SettingDAO.js';

/** @typedef {import('#dao/blog/SettingDAO').SettingDAO} DAO */
/** @typedef {import('#service/BaseService').ExtractModel<DAO>} Model */

/**
 * Setting服务
 * 
 * @extends {BaseService<DAO, Model>}
 */
class SettingService extends BaseService {}

const settingService = new SettingService(settingDAO);
export { SettingService, settingService };
