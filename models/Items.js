const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventory = new Schema({
    warehouse: {
        Type: String},
    itemName:{
        type: String,
        required: true},
    SKU: {
        type: String,
        required: true}

});

const inv = mongoose.model ('SNW Items', inventory);

module.exports = {
    inv
};