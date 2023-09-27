import VHandler, { Result } from '#handler';
import { tagService } from '#service/blog/TagService.js';

/**
 * 保存标签
 */
export default VHandler.buildPOST(
    /**
     * @param {Object} param0 请求参数
     * @param {string} param0.name 名称
     * @param {string} param0.description 描述
     */
    async ({ name, description }) => {
        const result = await tagService.save({ name, description });
        return Result.success({ message: '保存成功!', data: result });
    }
);
