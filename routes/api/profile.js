const express = require('express')
const {
    getProfile
} = require('../../controllers/profile')
const router = express.Router()

//routes@   /api/users
//access@   public
router.get('/', getProfile)

module.exports = router