import VHandler, { Result } from '#handler';
import { articleService } from '#service/blog/ArticleService.js';

/**
 * 保存文章
 */
export default VHandler.buildPOSTAndAuth(
    /**
     * @param {Object} param0 请求参数
     * @param {string} param0.title 标题
     * @param {string} [param0.description] 描述
     * @param {string} [param0.content] 内容
     * @param {string} [param0.cover] 封面
     * @param {string} [param0.category] 分类
     * @param {string} [param0.tags] 标签
     * @param {import('#dao/blog/model/UserModel').User} param0.__token_data__ token携带用户数据
     */
    async ({ title, description, content, cover, category, tags, __token_data__ }) => {
        tags && (tags = tags.split(','));
        const result = await articleService.save({
            title,
            description,
            content,
            cover,
            category,
            tags,
            author: __token_data__.nickname
        });
        return Result.success({ message: '保存成功!', data: result });
    }
);
