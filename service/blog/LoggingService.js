import { BaseService } from '#service/BaseService.js';
import { loggingDAO } from '#dao/blog/LoggingDAO.js';

/** @typedef {import('#dao/blog/LoggingDAO').LoggingDAO} DAO */
/** @typedef {import('#service/BaseService').ExtractModel<DAO>} Model */

/**
 * Logging服务
 * 
 * @extends {BaseService<DAO, Model>}
 */
class LoggingService extends BaseService {}

const loggingService = new LoggingService(loggingDAO);
export { LoggingService, loggingService };
