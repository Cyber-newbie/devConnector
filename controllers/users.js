const User = require('../models/Users')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('dotenv')

//load dotenv variables
env.config({
    path: '../config/.env'
})

const getAllUsers = (req, res) => {
    res.json({
        msg: 'users'
    })
}

const registerUser = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })

    if (user) {
        res.status(400).json({
            msg: 'email already exist'
        })
    } else {
        const avatar = gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password
        })
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newUser.password, salt)
            newUser.password = hashedPassword
            const user = await newUser.save()
            res.status(201).json({
                msg: 'user created',
                user
            })
        } catch (error) {
            if (error.name === "ValidationError") {
                let errors = {};

                Object.keys(error.errors).forEach((key) => {
                    errors[key] = error.errors[key].message;
                });

                return res.status(400).json(errors);
            }
            res.status(500).json({
                msg: "Something went wrong"
            });
        }
    }
}

const loginUser = async (req, res) => {
    const {
        email,
        password
    } = req.body
    const user = await User.findOne({
        email
    })
    if (!user) {
        res.status(400).json({
            msg: 'user not found'
        })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
        const payload = {
            id: user.id,
            name: user.name
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 3600
        })
        res.status(200).json({
            msg: 'logged in',
            token: `Bearer ${token}`
        })
    } else {
        res.status(400).json({
            msg: 'incorrect password'
        })
    }
}

module.exports = {
    getAllUsers,
    registerUser,
    loginUser
}