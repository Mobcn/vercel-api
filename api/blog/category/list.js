import VHandler from '#handler';
import { categoryService } from '#service/blog/CategoryService.js';

/**
 * 获取分类列表
 */
export default VHandler.buildGET(async () => await categoryService.listAll());
