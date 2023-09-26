import { BaseService } from '#service/BaseService.js';
import { tagDAO } from '#dao/blog/TagDAO.js';

/** @typedef {import('#dao/blog/TagDAO').TagDAO} DAO */
/** @typedef {import('#service/BaseService').ExtractModel<DAO>} Model */

/**
 * Tag服务
 * 
 * @extends {BaseService<DAO, Model>}
 */
class TagService extends BaseService {}

const tagService = new TagService(tagDAO);
export { TagService, tagService };
