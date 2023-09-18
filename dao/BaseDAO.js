/**
 * @template T
 * @typedef {T extends import('mongoose').Model<infer U> ? U : unknown} ExtractProps
 */

/**
 * 基础数据访问
 *
 * @template {import('mongoose').Model} TModel
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
     * @returns {Promise<Array<ExtractProps<TModel> & { _id: string, __v: number }>>}
     */
    async listAll() {
        return await this.Model.find();
    }
}

export { BaseDAO };
