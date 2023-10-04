import VHandler from '#handler';
import { categoryService } from '#service/blog/CategoryService.js';

/**
 * 获取所有分类
 */
export default VHandler.buildGET(async () => await categoryService.listAll());
