const express = require('express')
const router = express.Router()
router.use(express.json());
// router.use(express.json({ limit: '500mb' }));
// router.use(express.urlencoded({ limit: '500mb', extended: true }));
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { getListProduct, uploadedImg, uploadProduct, getImages, getProduct, getService, deleteProduct,
    updateProduct, getlistOrder, deleteOrder, uploadService, uploadOrder, deleteAppointment, getlistAppointment,
    uploadAppointment, createPayment, queryOrderStatus } = require('../controller/homeController');

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
router.post('/uploadOrder', uploadOrder)
router.get('/getlistAppointment', getlistAppointment)
router.delete('/deleteAppointment/:id', deleteAppointment)
router.get('/getOrders', getlistOrder)
router.delete('/deleteOrder/:id', deleteOrder)

// API zalo
// router.post('/payment/:totalCost', createPayment)
router.post('/payment', createPayment)

// router.post('/order-status/:app_trans_id', queryOrderStatus)



module.exports = router;