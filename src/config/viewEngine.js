const express = require('express')
const configViewEngine = (app) => {
    app.set('views', './src/view/');
    app.set('view engine', 'ejs')
    app.use(express.static('src'))

}

module.exports = configViewEngine;
