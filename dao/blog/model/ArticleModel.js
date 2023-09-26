import mongoose, { Schema } from 'mongoose';

/**
 * Article表
 */
const info = {
    model: "Article",
    table: "b_article",
    property: {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 128
        },
        description: {
            type: String,
            trim: true,
            maxlength: 256
        },
        content: String,
        cover: {
            type: String,
            trim: true,
            maxlength: 256
        },
        category: String,
        top_time: Date,
        views: {
            type: Number,
            default: 0
        },
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

/** @typedef {import('#dao/BaseDAO').RawDocType<typeof Model>} Article */
