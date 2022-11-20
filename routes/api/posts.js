const express = require('express')
const {
    getPosts
} = require('../../controllers/posts')
const router = express.Router()

//routes@   /api/users
//access@   public
router.get('/', getPosts)

module.exports = router