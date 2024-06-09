require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const webrRoutes = require('./routes/web')
const mysql = require('mysql2')
const connection = require('./config/database')
const cors = require('cors');

const multer = require('multer');
const path = require('path');


const app = express()
app.use(cors()); // Enable CORS for all routes
app.use(webrRoutes);


const port = process.env.PORT;
const localhost = process.env.HOST_NAME;


configViewEngine(app);// cấu hình ở config/configEngine
app.use('/', webrRoutes);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    const image = req.file;
    if (!image) {
        return res.status(400).send('No file uploaded.');
    }

    const sql = "INSERT INTO images (name, data, mimetype) VALUES (?, ?, ?)";
    const values = [image.originalname, image.buffer, image.mimetype];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving the image.');
        }
        res.status(200).send('Image uploaded successfully.');
    });
});
app.get('/getImages/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT data, mimetype FROM images WHERE id = ?', id, (err, result) => {
        if (err) {
            throw err;
        }
        res.setHeader('Content-Type', result[0].mimetype);
        res.send(result[0].data);
        console.log(result[0].mimetype);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})