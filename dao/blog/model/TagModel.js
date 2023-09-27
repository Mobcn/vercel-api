import mongoose, { Schema } from 'mongoose';

/**
 * Tag表
 */
const info = {
    model: "Tag",
    table: "d_tag",
    property: {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 128,
            unique: true
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
 * @typedef {import('#dao/BaseDAO').RawDocType<typeof Model>} Tag
 */
