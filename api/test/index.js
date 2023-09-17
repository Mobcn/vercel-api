import VHandler from '#handler';

export default VHandler.buildGET(
    /**
     * @param {any} query 请求参数
     */
    (query) => {
        return {
            content: 'hello',
            ...query
        };
    }
);
