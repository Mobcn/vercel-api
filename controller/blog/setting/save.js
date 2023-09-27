import VHandler, { Result } from '#handler';
import { settingService } from '#service/blog/SettingService.js';

/**
 * 保存设置
 */
export default VHandler.buildPOSTAndAuth(
    /**
     * @param {Object} param0 请求参数
     * @param {string} param0.key 设置键名
     * @param {string} param0.value 设置键值
     * @param {string} [param0.description] 设置描述
     * @param {boolean} [param0.is_public] 是否为公共设置
     * @param {import('#dao/blog/model/UserModel').User} param0.__token_data__ token携带用户数据
     */
    async ({ key, value, description, is_public, __token_data__ }) => {
        if (!__token_data__.is_admin) {
            throw new Error('没有权限!');
        }
        is_public && (is_public = Boolean(is_public));
        const result = await settingService.save({ key, value, description, is_public });
        return Result.success({ message: '保存成功!', data: result });
    }
);
