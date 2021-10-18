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

// route to webpages
app.use('/company', require('./routes/warehouses.js'))
// route to add
app.use('/item', require('./routes/api/api.js'))
//route to read
app.use('/Inventory', require('./routes/api/api.js'))
//route to delete
app.use('/Inventory/Del', require('./routes/api/api.js'))
//route to update
app.use('/Inventory/Up', require('./routes/api/api.js'))


app.listen(port, () => {
    console.log(`running on port ${port}`)
})