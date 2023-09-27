import mongoose, { Schema } from 'mongoose';

/**
 * Logging表
 */
const info = {
    model: "Logging",
    table: "s_logging",
    property: {
        operation: {
            type: String,
            required: true,
            maxlength: 256
        },
        params: {
            type: String,
            maxlength: 256
        },
        result: {
            type: String,
            maxlength: 256
        },
        status: {
            type: Number,
            default: 1
        },
        create_time: {
            type: Date,
            default: Date.now
        }
    }
};

export const Model = mongoose.model(info.model, new Schema(info.property), info.table);

/**
 * @typedef {import('#dao/BaseDAO').RawDocType<typeof Model>} Logging
 */
