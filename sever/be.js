require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')

const port = process.env.PORT;
const localhost = process.env.HOST_NAME;

app.set('views', './src/view/');
app.set('view engine', 'ejs')
app.use(express.static('src'))


app.get('/', (req, res) => {
    res.render('sample.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})