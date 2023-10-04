import VHandler from '#handler';
import { tagService } from '#service/blog/TagService.js';

/**
 * 获取标签列表
 */
export default VHandler.buildGET(
    /**
     * @param {Object} param0 请求参数
     * @param {string | number} [param0.page] 页数
     * @param {string | number} [param0.limit] 每页数据条数
     */
    async ({ page, limit }) => {
        page && (page = Number(page)) <= 0 && (page = undefined);
        limit && (limit = Number(limit)) <= 0 && (limit = undefined);
        return await tagService.page({ page, limit });
    }
);
