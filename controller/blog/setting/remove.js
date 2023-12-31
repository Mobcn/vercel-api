import VHandler, { Result } from '#handler';
import { settingService } from '#service/blog/SettingService.js';

/**
 * 删除设置
 */
export default VHandler.buildPOSTAndAuth(
    /**
     * @param {Object} param0 请求参数
     * @param {string} param0._id 主键ID
     * @param {import('#dao/blog/model/UserModel').User} param0.__token_data__ token携带用户数据
     */
    async ({ _id, __token_data__ }) => {
        if (!__token_data__.is_admin) {
            throw new Error('没有权限!');
        }
        await settingService.removeById(_id);
        Result.success({ message: '删除成功!' });
    }
);
