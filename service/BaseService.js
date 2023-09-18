import BaseDAO from '#dao/BaseDAO.js';

/**
 * 基础服务
 *
 * @template {BaseDAO<TModel, TSchema>} TDAO
 * @template {import('mongoose').Model} TModel
 * @template {import('mongoose').Schema} TSchema
 */
class BaseService {
    /**
     * 数据访问对象
     *
     * @type {TDAO}
     */
    DAO;

    /**
     * @param {TDAO} DAO 数据访问对象
     */
    constructor(DAO) {
        if (!DAO) {
            throw new Error('缺少数据访问对象');
        }
        this.DAO = DAO;
    }

    /**
     * 获取所有数据
     */
    async listAll() {
        return await this.DAO.listAll();
    }
}

export default BaseService;
