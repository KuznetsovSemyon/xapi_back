import mongoose from 'mongoose'

const ClientLrsSchema = new mongoose.Schema({
    _id: { Type: mongoose.Schema.ObjectId },
    api: {
        basic_key: { Type: String },
        basic_secret: { Type: String }
    },
    lrs_id: { Type: mongoose.Schema.ObjectId },
    authority: {
        name: { Type: String },
        mbox: { Type: String }
    },
    scopes: [String],
    updated_at: { Type: Date },
    created_at: { Type: Date }
})

export default ClientLrsSchema