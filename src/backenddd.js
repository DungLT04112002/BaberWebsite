require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const webrRoutes = require('./routes/web')
const mysql = require('mysql2')
const connection = require('./config/database')
const cors = require('cors');




const app = express()
app.use(cors()); // Enable CORS for all routes
app.use(webrRoutes);

const path = require('path')

const port = process.env.PORT;
const localhost = process.env.HOST_NAME;


configViewEngine(app);// cấu hình ở config/configEngine
app.use('/', webrRoutes);

// connection.query('select * from mechandise', function (err, results, fields) {
//     console.log(results);
// })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})