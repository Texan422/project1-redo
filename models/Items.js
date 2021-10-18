const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    warehouseName: {
        type: String,
        required: true},
    itemName:{
        type: String,
        required: true},
    SKU: {
        type: String,
        required: true}

});

const Inv = mongoose.model ('Inventory', InventorySchema);

module.exports = {
    Inv
};