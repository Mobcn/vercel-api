import MongoDB from '#mongodb';

/**
 * @typedef {{
 *     methods?: string | string[]
 * }} VHandlerSetting 请求处理器设置
 */

/**
 * 请求处理器
 */
class VHandler {
    /** @type {VHandlerSetting} */
    setting = {};

    /**
     * 请求处理创建
     *
     * @param {(query: VercelRequestQuery, request: VercelRequest, response: VercelResponse) => any} controller 控制器
     */
    build(controller) {
        return VHandler.build(controller, this.setting);
    }

    /**
     * 请求处理器设置配置
     *
     * @param {VHandlerSetting} setting 请求处理器设置
     */
    static config(setting) {
        const vHandler = new VHandler();
        if (setting?.methods) {
            if (typeof setting.methods === 'string') {
                vHandler.setting.methods = setting.methods.toUpperCase();
            } else {
                vHandler.setting.methods = setting.methods.map((m) => m.toUpperCase());
            }
        }
        return vHandler;
    }

    /**
     * GET请求处理创建
     *
     * @param {(query: VercelRequestQuery, request: VercelRequest, response: VercelResponse) => any} controller 控制器
     * @param {VHandlerSetting} setting 请求处理器设置
     */
    static buildGET(controller, setting) {
        return VHandler.build(controller, Object.assign({}, setting, { methods: 'GET' }));
    }

    /**
     * POST请求处理创建
     *
     * @param {(query: VercelRequestQuery, request: VercelRequest, response: VercelResponse) => any} controller 控制器
     * @param {VHandlerSetting} setting 请求处理器设置
     */
    static buildPOST(controller, setting) {
        return VHandler.build(controller, Object.assign({}, setting, { methods: 'POST' }));
    }

    /**
     * 请求处理创建
     *
     * @param {(query: VercelRequestQuery, request: VercelRequest, response: VercelResponse) => any} controller 控制器
     * @param {VHandlerSetting} setting 请求处理器设置
     */
    static build(controller, setting) {
        /** @type {(method: string) => boolean} */
        let methodCheck = () => true;
        if (setting?.methods) {
            if (typeof setting.methods === 'string') {
                methodCheck = (method) => method.toUpperCase() === setting.methods;
            } else {
                methodCheck = (method) => setting.methods.includes(method.toUpperCase());
            }
        }

        /**
         * @param {VercelRequest} request 请求对象
         * @param {VercelResponse} response 响应对象
         */
        return function handler(request, response) {
            response.setHeader('Content-Type', 'text/html;charset=UTF-8');
            if (!methodCheck(request.method)) {
                response.status(500).end(`非法的请求方法: ${request.method}`);
                return;
            }
            MongoDB.connect()
                .then(() => controller(request.query, request, response))
                .then((result) => {
                    response.status(200);
                    if (typeof result === 'object') {
                        response.json(result);
                    } else {
                        response.end(JSON.stringify(result));
                    }
                })
                .catch((error) => {
                    response.status(500).end(`服务器错误: ${error.message}`);
                })
                .finally(() => MongoDB.disconnect());
        };
    }
}

export default VHandler;
