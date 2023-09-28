const router = {
    '/blog/article/get': import('#controller/blog/article/get.js'),
    '/blog/article/list': import('#controller/blog/article/list.js'),
    '/blog/article/remove': import('#controller/blog/article/remove.js'),
    '/blog/article/save': import('#controller/blog/article/save.js'),
    '/blog/article/update': import('#controller/blog/article/update.js'),
    '/blog/category/all': import('#controller/blog/category/all.js'),
    '/blog/category/remove': import('#controller/blog/category/remove.js'),
    '/blog/category/save': import('#controller/blog/category/save.js'),
    '/blog/setting/list': import('#controller/blog/setting/list.js'),
    '/blog/setting/remove': import('#controller/blog/setting/remove.js'),
    '/blog/setting/save': import('#controller/blog/setting/save.js'),
    '/blog/tag/all': import('#controller/blog/tag/all.js'),
    '/blog/tag/remove': import('#controller/blog/tag/remove.js'),
    '/blog/tag/save': import('#controller/blog/tag/save.js'),
    '/blog/blog/user/all': import('#controller/blog/user/all.js'),
    '/blog/blog/user/destroy': import('#controller/blog/user/destroy.js'),
    '/blog/blog/user/login': import('#controller/blog/user/login.js'),
    '/blog/blog/user/register': import('#controller/blog/user/register.js')
};

/**
 * @param {import("#handler").VercelRequest} request 请求对象
 * @param {import("#handler").VercelResponse} response 响应对象
 */
export default function handler(request, response) {
    const { pathname } = new URL(request.url, `http://${request.headers.host}`);
    if (Object.keys(router).includes(pathname)) {
        Promise.resolve(router[pathname])
            .then(({ default: handler }) => handler(request, response))
            .catch((error) => response.status(500).end(error.message));
    } else {
        response.status(404).end();
    }
}
