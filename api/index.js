/**
 * @param {import("#handler").VercelRequest} request 请求对象
 * @param {import("#handler").VercelResponse} response 响应对象
 */
export default function handler(request, response) {
    const { pathname } = new URL(request.url, `http://${request.headers.host}`);
    import(`#controller${pathname}.js`)
        .then(({ default: handler }) => handler(request, response))
        // .catch((error) => {
        //     if (error.code === 'ERR_MODULE_NOT_FOUND') {
        //         response.status(404).end();
        //     } else {
        //         response.status(500).end(error.message);
        //     }
        // })
        .finally(() => response.end());
}
