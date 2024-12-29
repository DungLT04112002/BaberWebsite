const express = require('express')
const router = express.Router()
router.use(express.json());
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const cacheMiddleware = require('../Middleware/cacheMiddleware')

// const { getListProduct, uploadedImg, uploadProduct, getImages, getProduct, getService, deleteProduct,
//     updateProduct, getlistOrder, deleteOrder, uploadService, uploadOrder, deleteAppointment, getlistAppointment,
//     uploadAppointment, createPayment, getStatusOrder, updateStatusShip, login,
//     updateStatus, LoginGoogle } = require('../controller/homeController');
//
const authenticateToken = require('../Middleware/middleware')
const { getListProduct, getProduct, deleteProduct, uploadProduct, updateProduct } = require('../Model/productModel')
const { uploadService, getService } = require('../Model/serviceModel');
const { getlistOrder, deleteOrder, uploadOrder } = require('../Model/orderModel')
const { getlistAppointment, uploadAppointment, deleteAppointment } = require('../Model/appointmentModel')

const { getImages, uploadedImg } = require('../controller/ImgController/ImgController')
const { LoginGoogle } = require('../controller/LoginSigninController/loginSigninCotroller')
const { createPayment, getStatusOrder } = require('../controller/ZaloPayController/zaloPayController')
const { totalRevenue } = require('../controller/RevenueController/revenueController')
const { updateStatus, updateStatusShip } = require('../controller/OrderController/OrderController')



//Product router
router.get('/getListProduct', cacheMiddleware, getListProduct);
router.post('/uploadProduct', authenticateToken(["employee", "admin"]), cacheMiddleware, uploadProduct);// Admin
router.get('/getProduct/:productCode', getProduct);//
router.delete('/deleteProduct/:productCode', authenticateToken(["admin"]), cacheMiddleware, deleteProduct)// Admin
router.put('/updateProduct/:productCode', authenticateToken(["employee", "admin"]), cacheMiddleware, updateProduct)// Employee
//Order router
router.get('/getOrders', getlistOrder)//
router.delete('/deleteOrder/:id', authenticateToken(["admin"]), cacheMiddleware, deleteOrder)// Admin
router.put('/updateStatus/:id', authenticateToken(["employee", "admin"]), cacheMiddleware, updateStatus)// Employee
router.put('/updateStatusShip/:id', authenticateToken(["employee", "admin"]), cacheMiddleware, updateStatusShip)// Employee
//router.put('/updateStatusShip/:id', authenticateToken(["employee", "admin"]), updateStatusShip)// Employee
router.post('/uploadOrder', cacheMiddleware, uploadOrder)
//Img router
router.post('/uploadImages', upload.single('image'), cacheMiddleware, uploadedImg);
router.get('/getImages/:productCode', cacheMiddleware, getImages);
//Service router
router.get('/getServices', cacheMiddleware, getService);//
router.post('/uploadService', authenticateToken(["admin"]), cacheMiddleware, uploadService);//
//Appointment router
router.post('/uploadAppointment', authenticateToken(["admin"]), cacheMiddleware, uploadAppointment)//
router.get('/getlistAppointment', getlistAppointment, cacheMiddleware)//
router.delete('/deleteAppointment/:id', authenticateToken(["admin"]), cacheMiddleware, deleteAppointment)// 
// API zalo
router.post('/payment/:totalCost', createPayment, cacheMiddleware)//
router.post('/status-order/:app_trans_id', authenticateToken(["employee", "admin"]), cacheMiddleware, getStatusOrder)//
//router.post('/login', login);
router.post('/logingoogle', cacheMiddleware, LoginGoogle);//
router.get('/totalRevenue', cacheMiddleware, totalRevenue);//





module.exports = router;