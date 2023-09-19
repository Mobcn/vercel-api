/**
 * @template T
 * @typedef {T extends import('mongoose').Model<any, any, any, any, infer U> ? U : unknown} ResultDoc
 */

/**
 * @template T
 * @typedef {T extends import('mongoose').Model<infer U> ? U : unknown} RawDocType
 */

/**
 * 基础数据访问
 *
 * @template {import('mongoose').Model<any, any, any, any, import('mongoose').Document>} TModel
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
     * @returns {Promise<ResultDoc<TModel>[]>}
     */
    async listAll() {
        return await this.Model.find();
    }

    /**
     * 添加
     *
     * @param {RawDocType<TModel>} inserData
     * @returns {Promise<ResultDoc<TModel>>}
     */
    async insert(inserData) {
        const insertModel = new this.Model(inserData);
        return await insertModel.save();
    }
}

export { BaseDAO };
