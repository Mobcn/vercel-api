import VHandler from '#handler';
import { articleService } from '#service/blog/ArticleService.js';

/**
 * 获取所有文章
 */
export default VHandler.buildGET(async () => await articleService.listAll());
