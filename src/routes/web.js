const express = require('express')
const router = express.Router()
router.use(express.json());
// router.use(express.json({ limit: '500mb' }));
// router.use(express.urlencoded({ limit: '500mb', extended: true }));
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { getListProduct, uploadedImg, uploadProduct, getImages, getProduct, getService, deleteProduct, updateProduct, uploadService, uploadAppointment } = require('../controller/homeController');

router.get('/getListProduct', getListProduct);
router.post('/uploadImages', upload.single('image'), uploadedImg);
router.post('/uploadProduct', uploadProduct);
router.get('/getImages/:productCode', getImages);
router.get('/getProduct/:productCode', getProduct);
router.delete('/deleteProduct/:productCode', deleteProduct)
router.put('/updateProduct/:productCode', updateProduct)
router.get('/getServices', getService);
router.post('/uploadService', uploadService);
router.post('/uploadAppointment', uploadAppointment)

module.exports = router;