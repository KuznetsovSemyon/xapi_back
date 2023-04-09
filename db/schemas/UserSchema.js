import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
    },
    role: {
      type: String,
      ref: 'Role'
    },
    password: {
      type: String,
        required: true
    }
})

//const User = mongoose.model('User', UserSchema)

export default UserSchema