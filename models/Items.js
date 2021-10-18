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

// const CompanySchema = new Schema({
//     companyName: String,
//     image: String,
//     warehouses: [{
//         warehouseName: String,
//         capacity: Number,
//         currentAmount: Number,
//         items: [{
//             itemName: String, // ['apple', 'apple'] OR [{itemName: 'apple'. amount: 2}]
//             amount: Number,
//             image: String
//         }]
//     }]
//     // warehouses: [{
//     //     type: mongoose.Types.ObjectId,
//     //     ref: Warehouse
//     // }]
// })

const Inv = mongoose.model ('Inventory', InventorySchema);

module.exports = {
    Inv
};