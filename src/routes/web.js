const express = require('express')
const router = express.Router()
router.use(express.json());
// router.use(express.json({ limit: '500mb' }));
// router.use(express.urlencoded({ limit: '500mb', extended: true }));
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { getHomepage, uploadedImg, uploadProduct, getImages } = require('../controller/homeController');

router.get('/getListMechandise', getHomepage);
router.post('/uploadImages', upload.single('image'), uploadedImg);
router.post('/uploadProduct', uploadProduct);
router.get('/getImages/:productCode', getImages);


module.exports = router;