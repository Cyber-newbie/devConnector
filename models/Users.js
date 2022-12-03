const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: v => Array.isArray(v) && v.length > 0,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: v => Array.isArray(v) && v.length > 0
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Users = mongoose.model('users', UserSchema)