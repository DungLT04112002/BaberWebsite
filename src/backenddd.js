const axios = require('axios');
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const webrRoutes = require('./routes/web')
const mysql = require('mysql2')
const connection = require('./config/database')
const cors = require('cors');
const path = require('path');


const app = express()
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors()); // Enable CORS for all routes
app.use(webrRoutes);


const port = process.env.PORT;
const localhost = process.env.HOST_NAME;


configViewEngine(app);// cấu hình ở config/configEngine
app.use('/', webrRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})