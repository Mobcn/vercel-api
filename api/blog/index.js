import VHandler from '#handler';
import { userService } from '#service/blog/UserService.js';

export default VHandler.buildGET(async () => {
    const data = await userService.listAll();
    return { data };
});
