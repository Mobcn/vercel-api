import mongoose, { Schema } from 'mongoose';

/**
 * Category表
 */
const info = {
    model: "Category",
    table: "d_category",
    property: {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 2,
            maxlength: 128
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 256
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
 * @typedef {import('#dao/BaseDAO').RawDocType<typeof Model>} Category
 */
