import VHandler from '#handler';
import { userService } from '#service/blog/UserService.js';

/**
 * 获取所有用户
 */
export default VHandler.buildGETAndAuth(async () => await userService.listAll());
