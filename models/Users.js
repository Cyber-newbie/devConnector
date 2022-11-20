const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'enter your password']
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