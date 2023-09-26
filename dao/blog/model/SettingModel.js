import mongoose, { Schema } from 'mongoose';

/**
 * Setting表
 */
const info = {
    model: "Setting",
    table: "s_setting",
    property: {
        key: {
            type: String,
            required: true,
            trim: true,
            maxlength: 128
        },
        value: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2048
        },
        is_public: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            trim: true,
            maxlength: 256
        }
    }
};

export const Model = mongoose.model(info.model, new Schema(info.property), info.table);
