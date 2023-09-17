import mongoose from 'mongoose';

const databaseName = 'vercel-api';

/**
 * MongoDB数据库工具
 */
const MongoDB = {
    /**
     * 开启数据库连接
     */
    connect: async () => {
        if (!process.env.MONGODB_URI) {
            throw new Error('缺少环境变量`MONGODB_URI`');
        }
        let uri = process.env.MONGODB_URI;
        let index = uri.indexOf('?');
        const search = index !== -1 ? uri.substring(index) : '';
        index = uri.lastIndexOf('/');
        uri = uri.substring(0, index + 1) + databaseName + search;
        return await mongoose.connect(uri);
    },

    /**
     * 关闭数据库连接
     */
    disconnect: () => mongoose.disconnect()
};

export default MongoDB;
