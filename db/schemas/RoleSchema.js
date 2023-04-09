import mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
    },
})

//const Role = mongoose.model('Role', RoleSchema)

export default RoleSchema