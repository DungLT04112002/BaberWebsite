const express = require('express')
const router = express.Router()
router.use(express.json());
router.use(express.json({ limit: '500mb' }));
router.use(express.urlencoded({ limit: '500mb', extended: true }));

const { getHomepage, uploadedImg } = require('../controller/homeController')

router.get('/getListMechandise', getHomepage)
// router.post('/uploadImg', uploadedImg)


module.exports = router;