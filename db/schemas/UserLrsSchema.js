import mongoose from 'mongoose'

const UserLrsSchema = new mongoose.Schema({
    name: { Type: String },
    email: { Type: String },
    verified: { Type: String },
    role: { Type: String },
    password: { Type: String },
    updated_at: { Type: Date },
    created_at: { Type: Date }
})

export default UserLrsSchema