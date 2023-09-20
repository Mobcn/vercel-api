import VHandler from '#handler';
import { userService } from '#service/blog/UserService.js';

/**
 * 获取所有用户
 */
export default VHandler.buildGET(async () => await userService.listAll());