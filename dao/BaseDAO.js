/**
 * 基础数据访问
 *
 * @template {import('mongoose').Model} TModel
 * @template {import('mongoose').Schema} TSchema
 */
class BaseDAO {
    /**
     * 数据模型
     *
     * @type {TModel}
     */
    Model;

    /**
     * @param {TModel} Model 数据模型
     */
    constructor(Model) {
        if (!Model) {
            throw new Error('缺少数据模型参数');
        }
        this.Model = Model;
    }

    /**
     * 获取所有数据
     *
     * @returns {Promise<Array<import('mongoose').InferSchemaType<TSchema> & { _id: string, __v: number }>>}
     */
    async listAll() {
        return await this.Model.find();
    }
}

export default BaseDAO;
