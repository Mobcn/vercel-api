import VHandler from '#handler';
import { tagService } from '#service/blog/TagService.js';

/**
 * 获取标签列表
 */
export default VHandler.buildGET(async () => await tagService.listAll());
