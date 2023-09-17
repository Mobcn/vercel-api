import VHandler from '#handler';
import UserModel from '#dao/model/UserModel.js';

export default VHandler.buildGET(
    /**
     * @param {Object} param0 请求参数
     * @param {string} param0.a 测试
     */
    async ({ a }) => {
        const result = await UserModel.find();
        return {
            content: 'hello',
            a,
            result
        };
    }
);
