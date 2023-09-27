import mongoose, { Schema } from 'mongoose';

/**
 * User表
 */
const info = {
    model: "User",
    table: "s_user",
    property: {
        nickname: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: 128
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: 128
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            maxlength: 16
        },
        avatar: {
            type: String,
            trim: true,
            maxlength: 256
        },
        is_admin: {
            type: Boolean,
            default: false
        },
        last_login_time: Date,
        status: {
            type: Number,
            default: 1
        },
        create_time: {
            type: Date,
            default: Date.now
        },
        update_time: {
            type: Date,
            default: Date.now
        }
    }
};

export const Model = mongoose.model(info.model, new Schema(info.property), info.table);

/**
 * @typedef {import('#dao/BaseDAO').RawDocType<typeof Model>} User
 */
