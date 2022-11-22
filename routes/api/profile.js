const express = require('express')
const Validator = require('validator');
const {
    getProfile,
    userProfile
} = require('../../controllers/profile')
const passport = require('passport')
const router = express.Router()

//routes@   /api/users
//access@   public
router.get('/', getProfile)

//routes@   /api/profile
//access@   private
router.post('/', passport.authenticate('jwt', {
    session: false,
}), userProfile)

module.exports = router