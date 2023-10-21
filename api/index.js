/** @typedef {import("#handler").VercelRequest} VercelRequest */
/** @typedef {import("#handler").VercelResponse} VercelResponse */
/** @typedef {(request: VercelRequest, response: VercelResponse) => void} VercelHandler */

/**
 * @type {{ [path: string]: () => Promise<{ default: VercelHandler }> }}
 */
const router = {
    '/auto/all': () => import('#controller/auto/all.js'),
    '/auto/model': () => import('#controller/auto/model.js'),
    '/auto/module': () => import('#controller/auto/module.js'),
    '/auto/remove': () => import('#controller/auto/remove.js'),
    '/auto/save': () => import('#controller/auto/save.js'),
    '/auto/update': () => import('#controller/auto/update.js'),
    '/blog/article/get': () => import('#controller/blog/article/get.js'),
    '/blog/article/list': () => import('#controller/blog/article/list.js'),
    '/blog/article/remove': () => import('#controller/blog/article/remove.js'),
    '/blog/article/save': () => import('#controller/blog/article/save.js'),
    '/blog/article/update': () => import('#controller/blog/article/update.js'),
    '/blog/category/all': () => import('#controller/blog/category/all.js'),
    '/blog/category/list': () => import('#controller/blog/category/list.js'),
    '/blog/category/remove': () => import('#controller/blog/category/remove.js'),
    '/blog/category/save': () => import('#controller/blog/category/save.js'),
    '/blog/setting/all': () => import('#controller/blog/setting/all.js'),
    '/blog/setting/list': () => import('#controller/blog/setting/list.js'),
    '/blog/setting/remove': () => import('#controller/blog/setting/remove.js'),
    '/blog/setting/save': () => import('#controller/blog/setting/save.js'),
    '/blog/tag/all': () => import('#controller/blog/tag/all.js'),
    '/blog/tag/list': () => import('#controller/blog/tag/list.js'),
    '/blog/tag/remove': () => import('#controller/blog/tag/remove.js'),
    '/blog/tag/save': () => import('#controller/blog/tag/save.js'),
    '/blog/user/all': () => import('#controller/blog/user/all.js'),
    '/blog/user/destroy': () => import('#controller/blog/user/destroy.js'),
    '/blog/user/login': () => import('#controller/blog/user/login.js'),
    '/blog/user/register': () => import('#controller/blog/user/register.js'),
    '/test/db': () => import('#controller/test/db.js'),
    '/test/index': () => import('#controller/test/index.js')
};

/**
 * @param {VercelRequest} request 请求对象
 * @param {VercelResponse} response 响应对象
 */
export default function handler(request, response) {
    const { pathname } = new URL(request.url, 'http://' + request.headers.host);
    if (Object.keys(router).includes(pathname)) {
        router[pathname]()
            .then(({ default: handler }) => handler(request, response))
            .catch((error) => response.status(500).end(error.message));
    } else {
        import('#dao/database/APIModel.js')
            .then(async ({ Model: APIModel }) => {
                const paths = pathname.split('/');
                if (paths.length > 3) {
                    import('#db').then(({ default: DB }) => DB.connect());
                    const module = paths[1];
                    const model = paths[2][0].toUpperCase() + paths[2].substring(1);
                    const path = '/' + paths.slice(3).join('/');
                    const api = await APIModel.findOne({ module, model, path, status: true }).exec();
                    if (api) {
                        const [[VHandler, Result], Model] = await Promise.all([
                            import('#handler').then(({ default: VHandler, Result }) => [VHandler, Result]),
                            import('#dao/' + api.module + '/model/' + model + 'Model.js').then(({ Model }) => Model)
                        ]);
                        const handler = VHandler.config({
                            methods: api.method,
                            authorized: api.authorized
                        }).build(eval('(Model, Result) => ' + api.handler)(Model, Result));
                        handler(request, response);
                        return;
                    }
                }
                response.status(404).end();
            })
            .catch((error) => response.status(500).end(error.message));
    }
}
