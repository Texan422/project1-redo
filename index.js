const express = require('express');
const {resolve} = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8088

app.use(express.json()); //auto parses JSON data for us
app.use(express.urlencoded({extended: true})); // allows to parse encoded form data
app.use(express.static('public')); // sets aside a static assets folder for static content (html/css/js)

app.get('/', (req, res) => {
    res.sendFile(resolve('public', 'views', 'index.html'))
})

// routes to webpages
app.use('/company', require('./routes/warehouses.js'))


app.listen(port, () => {
    console.log(`running on port ${port}`)
})