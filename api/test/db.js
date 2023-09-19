import DB from '#db';

/**
 * @param {import('#handler').VercelRequest} request
 * @param {import('#handler').VercelResponse} response
 */
export default function handler(request, response) {
    response.setHeader('Content-Type', 'text/html;charset=UTF-8');
    DB.connect()
        .then(() => response.status(200).end('连接成功！'))
        .catch((error) => response.status(500).end(`连接失败: ${error.message}`))
        .finally(() => DB.disconnect());
}
