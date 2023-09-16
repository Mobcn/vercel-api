/**
 * @typedef {{ [key: string]: string }} VercelRequestCookies Vercel请求Cookie
 */

/**
 * @typedef {{ [key: string]: string | string[] }} VercelRequestQuery Vercel请求参数
 */

/**
 * @typedef {any} VercelRequestBody Vercel请求体
 */

/**
 * @typedef {import('http').IncomingMessage & {
 *     query: VercelRequestQuery;
 *     cookies: VercelRequestCookies;
 *     body: VercelRequestBody;
 * }} VercelRequest Vercel请求
 */

/**
 * @typedef {import('http').ServerResponse & {
 *     send: (body: any) => VercelResponse;
 *     json: (jsonBody: any) => VercelResponse;
 *     status: (statusCode: number) => VercelResponse;
 *     redirect: (statusOrUrl: string | number, url?: string) => VercelResponse;
 * }} VercelResponse Vercel响应
 */
