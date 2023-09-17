import VHandler from '#handler';
import MongoDB from '#mongodb';

export default VHandler.buildGET(async () => {
    let content = '连接成功！';
    try {
        await MongoDB.connect();
    } catch (error) {
        content = '连接失败\n' + error;
    }
    return { content };
});
