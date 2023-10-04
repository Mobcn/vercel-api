import VHandler from '#handler';
import { tagService } from '#service/blog/TagService.js';

/**
 * 获取所有标签
 */
export default VHandler.buildGET(async () => await tagService.listAll());
