import DB from '#db';

/** @typedef {import('http').IncomingMessage} IncomingMessage 消息 */
/** @typedef {import('http').ServerResponse} ServerResponse 响应 */
/** @typedef {{ [key: string]: string }} VercelRequestCookies Vercel请求Cookie */
/** @typedef {{ [key: string]: string | string[] }} VercelRequestQuery Vercel请求参数 */
/** @typedef {any} VercelRequestBody Vercel请求体 */
/** @typedef {(body: any) => VercelResponse} SendFun 发送响应 */
/** @typedef {(jsonBody: any) => VercelResponse} JSONFun 响应JSON */
/** @typedef {(statusCode: number) => VercelResponse} StatusFun 响应状态设置 */
/** @typedef {(statusOrUrl: string | number, url?: string) => VercelResponse} RedirectFun 重定向 */
/** @typedef {IncomingMessage & { query: VercelRequestQuery; cookies: VercelRequestCookies; body: VercelRequestBody; }} VercelRequest Vercel请求 */
/** @typedef {ServerResponse & { send: SendFun; json: JSONFun; status: StatusFun; redirect: RedirectFun; }} VercelResponse Vercel响应 */

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
            Promise.all([
                DB.connect(),
                Promise.resolve(controller(Object.assign({}, request.query, request.body), request, response)).then(
                    (result) => {
                        response.status(200);
                        if (typeof result === 'object') {
                            response.json(result instanceof Result ? result : Result.success({ data: result }));
                        } else {
                            response.end(Result.success({ data: JSON.stringify(result) }));
                        }
                    }
                )
            ])
                .catch((error) => response.json(Result.error({ message: error.message })))
                .finally(() => DB.disconnect());
        };
    }
}

/**
 * 返回数据对象
 */
export class Result {
    /** 响应码 */
    code;

    /** 响应消息 */
    message;

    /** 响应数据 */
    data;

    /**
     * @param {Object} param0 参数
     * @param {number} [param0.code=0] 响应码
     * @param {string} [param0.message='成功!'] 响应消息
     * @param {any} param0.data 响应数据
     */
    constructor({ code = 0, message = '成功!', data }) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    /**
     * 成功
     *
     * @param {{ code?: number; message?: string; data?: any }} params 结果参数
     */
    static success(params) {
        return new Result(params ?? {});
    }

    /**
     * 错误
     *
     * @param {{ code?: number; message?: string }} params 结果参数
     */
    static error(params) {
        return new Result(Object.assign({ code: -1, message: '失败!' }, params));
    }
}

export default VHandler;
