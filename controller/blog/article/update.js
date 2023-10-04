import VHandler, { Result } from '#handler';
import { articleService } from '#service/blog/ArticleService.js';

/**
 * 更新文章
 */
export default VHandler.buildPOSTAndAuth(
    /**
     * @param {Object} param0 请求参数
     * @param {string} param0._id 主键ID
     * @param {string} [param0.title] 标题
     * @param {string} [param0.description] 描述
     * @param {string} [param0.content] 内容
     * @param {string} [param0.cover] 封面
     * @param {string} [param0.category] 分类
     * @param {string} [param0.tags] 标签
     * @param {string} [param0.top_time] 置顶时间
     * @param {import('#dao/blog/model/UserModel').User} param0.__token_data__ token携带用户数据
     */
    async ({ _id, title, description, content, cover, category, tags, top_time, status, __token_data__ }) => {
        tags && (tags = tags.split(','));
        status && (status = Number(status));
        const result = await articleService.updateById({
            _id,
            title,
            description,
            content,
            cover,
            category,
            tags,
            top_time,
            status,
            user: __token_data__
        });
        return Result.success({ message: '更新成功!', data: result });
    }
);
