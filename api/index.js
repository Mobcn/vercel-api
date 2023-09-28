// import blogArticleGet from '#controller/blog/article/get.js';
// import blogArticleList from '#controller/blog/article/list.js';
// import blogArticleRemove from '#controller/blog/article/remove.js';
// import blogArticleSave from '#controller/blog/article/save.js';
// import blogArticleUpdate from '#controller/blog/article/update.js';
// import blogCategoryAll from '#controller/blog/category/all.js';
// import blogCategoryRemove from '#controller/blog/category/remove.js';
// import blogCategorySave from '#controller/blog/category/save.js';
// import blogSettingList from '#controller/blog/setting/list.js';
// import blogSettingRemove from '#controller/blog/setting/remove.js';
// import blogSettingSave from '#controller/blog/setting/save.js';
// import blogTagAll from '#controller/blog/tag/all.js';
// import blogTagRemove from '#controller/blog/tag/remove.js';
// import blogTagSave from '#controller/blog/tag/save.js';
// import blogUserAll from '#controller/blog/user/all.js';
// import blogUserDestroy from '#controller/blog/user/destroy.js';
// import blogUserLogin from '#controller/blog/user/login.js';
// import blogUserRegister from '#controller/blog/user/register.js';

// const router = {
//     '/blog/article/get': blogArticleGet,
//     '/blog/article/list': blogArticleList,
//     '/blog/article/remove': blogArticleRemove,
//     '/blog/article/save': blogArticleSave,
//     '/blog/article/update': blogArticleUpdate,
//     '/blog/category/all': blogCategoryAll,
//     '/blog/category/remove': blogCategoryRemove,
//     '/blog/category/save': blogCategorySave,
//     '/blog/setting/list': blogSettingList,
//     '/blog/setting/remove': blogSettingRemove,
//     '/blog/setting/save': blogSettingSave,
//     '/blog/tag/all': blogTagAll,
//     '/blog/tag/remove': blogTagRemove,
//     '/blog/tag/save': blogTagSave,
//     '/blog/blog/user/all': blogUserAll,
//     '/blog/blog/user/destroy': blogUserDestroy,
//     '/blog/blog/user/login': blogUserLogin,
//     '/blog/blog/user/register': blogUserRegister
// };

/**
 * @param {import("#handler").VercelRequest} request 请求对象
 * @param {import("#handler").VercelResponse} response 响应对象
 */
export default function handler(request, response) {
    const { pathname } = new URL(request.url, `http://${request.headers.host}`);
    // if (Object.keys(router).includes(pathname)) {
    //     try {
    //         router[pathname](request, response);
    //     } catch (error) {
    //         response.status(500).end(error.message);
    //     }
    // } else {
    //     response.status(404).end();
    // }
    import('#controller/blog/tag/all.js')
        .then(({ default: handler }) => handler(request, response))
}
