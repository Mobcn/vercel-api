import { BaseDAO } from '#dao/BaseDAO.js';
import { Model } from '#dao/blog/model/LoggingModel.js';

/**
 * Logging数据访问
 *
 * @extends {BaseDAO<typeof Model>}
 */
class LoggingDAO extends BaseDAO {}

const loggingDAO = new LoggingDAO(Model);
export { LoggingDAO, loggingDAO };
