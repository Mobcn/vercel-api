import VHandler from '#handler';
import { articleService } from '#service/blog/ArticleService.js';

/**
 * 保存文章
 */
export default VHandler.buildGET(
    /**
     * @param {Object} param0 请求参数
     * @param {string | undefined} param0.title 标题
     * @param {string | undefined} param0.description 描述
     * @param {string | undefined} param0.content 内容
     * @param {string | undefined} param0.cover 封面
     * @param {string | undefined} param0.category 分类
     * @param {string | undefined} param0.tags 标签
     */
    async ({ title, description, content, cover, category, tags }) => {
        tags && (tags = tags.split(','));
        return await articleService.save({ title, description, content, cover, category, tags });
    }
);
