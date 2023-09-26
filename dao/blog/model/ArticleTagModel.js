import mongoose, { Schema } from 'mongoose';

/**
 * ArticleTag表
 */
const info = {
    model: "ArticleTag",
    table: "r_article_tag",
    property: {
        article: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            required: true
        }
    }
};

export const Model = mongoose.model(info.model, new Schema(info.property), info.table);

/** @typedef {import('#dao/BaseDAO').RawDocType<typeof Model>} ArticleTag */
