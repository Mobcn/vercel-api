import { BaseDAO } from '#dao/BaseDAO.js';
import { Model } from '#dao/blog/model/TagModel.js';

/**
 * Tag数据访问
 *
 * @extends {BaseDAO<typeof Model>}
 */
class TagDAO extends BaseDAO {}

const tagDAO = new TagDAO(Model);
export { TagDAO, tagDAO };
