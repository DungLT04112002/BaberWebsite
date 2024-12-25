const express = require('express')
const router = express.Router()
router.use(express.json());
const authenticateToken = require('../Middleware/middleware')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { getListProduct, uploadedImg, uploadProduct, getImages, getProduct, getService, deleteProduct,
    updateProduct, getlistOrder, deleteOrder, uploadService, uploadOrder, deleteAppointment, getlistAppointment,
    uploadAppointment, createPayment, getStatusOrder, updateStatusShip, login,
    updateStatus, LoginGoogle } = require('../controller/homeController');

const { totalRevenue } = require('../controller/RevenueController/revenueController')


router.get('/getListProduct', getListProduct);
// router.get('/getListProduct', authenticateToken, getListProduct);
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
router.post('/payment/:totalCost', createPayment)
router.post('/status-order/:app_trans_id', getStatusOrder)
router.put('/updateStatus/:id', updateStatus)
router.put('/updateStatusShip/:id', updateStatusShip)
//router.post('/login', login);
router.post('/logingoogle', LoginGoogle);
router.get('/totalRevenue', totalRevenue);





module.exports = router;