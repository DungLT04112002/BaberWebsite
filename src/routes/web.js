const express = require('express')
const router = express.Router()
const {getHomepage}=require('../controller/homeController')

router.get('/', getHomepage)


module.exports = router;