import { BaseService } from '#service/BaseService.js';
import { articleDAO } from '#dao/blog/ArticleDAO.js';

/** @typedef {import('#dao/blog/ArticleDAO').ArticleDAO} DAO */
/** @typedef {import('#service/BaseService').ExtractModel<DAO>} Model */

/**
 * Article服务
 *
 * @extends {BaseService<DAO, Model>}
 */
class ArticleService extends BaseService {
    /**
     * 获取categoryDAO
     */
    static async getCategoryDAO() {
        const { categoryDAO } = await import('#dao/blog/CategoryDAO.js');
        return categoryDAO;
    }

    /**
     * 获取tagDAO
     */
    static async getTagDAO() {
        const { tagDAO } = await import('#dao/blog/TagDAO.js');
        return tagDAO;
    }

    /**
     * 获取articleTagDAO
     */
    static async getArticleTagDAO() {
        const { articleTagDAO } = await import('#dao/blog/ArticleTagDAO.js');
        return articleTagDAO;
    }

    /**
     * 获取文章分页列表
     *
     * @param {Object} param0 查询参数
     * @param {string} [param0.key] 模糊匹配key（匹配title、description、content）
     * @param {string} [param0.startTime] 创建时间起始
     * @param {string} [param0.endTime] 创建时间终止
     * @param {string[]} [param0.categories] 分类
     * @param {string[]} [param0.tags] 标签
     * @param {string} [param0.author] 作者
     * @param {string} [param0.page] 分页
     * @param {string} [param0.limit] 每页数据条数
     */
    async page({ key, startTime, endTime, categories, tags, author, page, limit }) {
        // 组织查询条件
        const condition = [{ status: 1 }];
        if (tags?.length > 0) {
            const articleIds = (await articleTagDAO.list({ filter: { tag: { $in: tags } } })).map(
                (item) => item.article
            );
            if (articleIds.length <= 0) {
                return [];
            }
            condition.push({ _id: { $in: articleIds } });
        }
        if (key) {
            condition.push({
                $or: [{ title: new RegExp(key) }, { description: new RegExp(key) }, { content: new RegExp(key) }]
            });
        }
        startTime && condition.push({ create_time: { $gte: startTime } });
        endTime && condition.push({ create_time: { $lte: endTime } });
        categories && condition.push({ category: { $in: categories } });
        author && condition.push({ author });

        // 获取文章列表
        const { list, total } = await articleDAO.page({ filter: { $and: condition }, page, limit });
        const articleList = list.map((item) => ({ ...item.toJSON(), _id: item._id.toString() }));

        // 获取文章分类名称
        const categorySet = new Set(articleList.filter((item) => item.category).map((item) => item.category));
        if (categorySet.size > 0) {
            const categoryIds = Array.from(categorySet);
            const categoryDAO = await ArticleService.getCategoryDAO();
            const categoryList = await categoryDAO.list({ filter: { _id: { $in: categoryIds } } });
            const categoryMap = new Map(categoryList.map((item) => [item._id.toString(), item.name]));
            for (const item of articleList) {
                item.category && (item.categoryName = categoryMap.get(item.category));
            }
        }

        // 获取文章标签
        const articleIds = articleList.map((item) => item._id);
        const articleTagDAO = await ArticleService.getArticleTagDAO();
        const articleTagList = await articleTagDAO.list({ filter: { article: { $in: articleIds } } });
        if (articleTagList.length > 0) {
            const tagIds = Array.from(new Set(articleTagList.map((item) => item.tag)));
            const tagDAO = await ArticleService.getTagDAO();
            const tagList = await tagDAO.list({ filter: { _id: { $in: tagIds } } });
            const tagMap = new Map(tagList.map((item) => [item._id.toString(), item.name]));
            const articleTagMap = new Map();
            for (const { article, tag } of articleTagList) {
                let tags = articleTagMap.get(article);
                if (!tags) {
                    tags = [];
                    articleTagMap.set(article, tags);
                }
                tags.push({ _id: tag, name: tagMap.get(tag) });
            }
            for (const item of articleList) {
                articleTagMap.has(item._id) && (item.tags = articleTagMap.get(item._id));
            }
        }

        return {
            list: articleList.map((item) => Object.assign(item, { status: undefined, __v: undefined })),
            total
        };
    }

    /**
     * 获取主键ID对应的数据
     *
     * @param {any} _id 主键ID
     */
    async getById(_id) {
        if (!_id) {
            throw new Error('参数[_id]不能为空!');
        }

        const article = await this.DAO.getById(_id);
        if (article) {
            if (article.status !== 1) {
                return undefined;
            }

            // 获取文章分类名称
            if (article.category) {
                const categoryDAO = await ArticleService.getCategoryDAO();
                const category = await categoryDAO.getById(article.category);
                article.categoryName = category.name;
            }

            // 获取文章标签
            const articleTagDAO = await ArticleService.getArticleTagDAO();
            const articleTagList = await articleTagDAO.list({ filter: { article: article._id } });
            if (articleTagList.length > 0) {
                const tagIds = articleTagList.map((item) => item.tag);
                const tagDAO = await ArticleService.getTagDAO();
                const tagList = await tagDAO.list({ filter: { _id: { $in: tagIds } } });
                const tagMap = new Map(tagList.map((item) => [item._id.toString(), item.name]));
                article.tags = tagIds.map((item) => ({ _id: item, name: tagMap.get(item) }));
            }
        }
        return Object.assign(article, { status: undefined, __v: undefined });
    }

    /**
     * 添加
     *
     * @param {Object} param0 参数
     * @param {string} param0.title 标题
     * @param {string} [param0.description] 描述
     * @param {string} [param0.content] 内容
     * @param {string} [param0.cover] 封面
     * @param {string} [param0.category] 分类
     * @param {string[]} [param0.tags] 标签
     * @param {string} [param0.author] 标签
     */
    async save({ title, description, content, cover, category, tags, author }) {
        if (!title) {
            throw new Error('参数[title]不能为空!');
        }

        // 添加文章
        const result = await this.DAO.insert({ title, description, content, cover, category, author });

        // 添加标签关联
        if (tags?.length > 0) {
            const datas = tags.map((tag) => ({ article: result._id, tag }));
            const articleTagDAO = await ArticleService.getArticleTagDAO();
            await articleTagDAO.insertBatch(datas);
        }

        return result;
    }

    /**
     * 更新主键ID对应的数据
     *
     * @param {Object} param0 参数
     * @param {string} param0._id 主键ID
     * @param {string} [param0.title] 标题
     * @param {string} [param0.description] 描述
     * @param {string} [param0.content] 内容
     * @param {string} [param0.cover] 封面
     * @param {string} [param0.category] 分类
     * @param {string[]} [param0.tags] 标签
     * @param {string} [param0.top_time] 置顶时间
     * @param {number} [param0.status] 状态
     * @param {import('#dao/blog/model/UserModel').User} param0.user 当前用户
     */
    async updateById({ _id, title, description, content, cover, category, tags, top_time, status, user }) {
        if (!_id) {
            throw new Error('参数[_id]不能为空!');
        }

        const article = await articleDAO.getById(_id);
        if (!article) {
            throw new Error(`不存在[_id]为${_id}的文章!`);
        }
        if (article.author !== user.nickname && !user.is_admin) {
            throw new Error('没有修改权限!');
        }

        // 修改标签
        if (tags) {
            const articleTagDAO = await ArticleService.getArticleTagDAO();
            const articleTagList = await articleTagDAO.list({ filter: { article: _id } });
            const tagIds = articleTagList.map((item) => item.tag);
            await Promise.all(
                articleTagDAO.delete({
                    _id: { $in: articleTagList.filter((item) => !tags.includes(item.tag)).map((item) => item._id) }
                }),
                articleTagDAO.insertBatch(
                    tags.filter((item) => !tagIds.includes(item)).map((item) => ({ article: _id, tag: item }))
                )
            );
        }

        // 修改文章
        title && (article.title = title);
        description && (article.description = description);
        content && (article.content = content);
        cover && (article.cover = cover);
        category && (article.category = category);
        status && (article.status = status);
        if (top_time) {
            article.top_time = top_time === 'null' ? undefined : top_time;
        }

        article.update_time = new Date();
        return await article.save();
    }

    /**
     * 更新主键ID对应的数据
     *
     * @param {string} _id 主键ID
     * @param {import('#dao/blog/model/UserModel').User} user 当前用户
     */
    async removeById(_id, user) {
        if (!_id) {
            throw new Error('参数[_id]不能为空!');
        }

        const article = await articleDAO.getById(_id);
        if (!article) {
            return;
        }
        if (article.author !== user.nickname && !user.is_admin) {
            throw new Error('没有删除权限!');
        }

        return await super.removeById(_id);
    }
}

const articleService = new ArticleService(articleDAO);
export { ArticleService, articleService };
