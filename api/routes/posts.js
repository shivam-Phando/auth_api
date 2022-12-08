const express = require('express')
const router = express.Router()
const postController = require('../controller/postController')

router.post('/',postController.createPost)

module.exports = postController