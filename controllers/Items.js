const Item = require('../models/Items.js');
const mongoose = require('mongoose');

const AddItems = async (warehouseName, {itemName, SKU}) => {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        const item = new Item.Inv({warehouseName, itemName, SKU})
            await item.save();
            mongoose.connection.close();
            return {status: 200, message: `${itemName} created.`};
    } 
    catch (err) {
        mongoose.connection.close();
        throw err
    }
}

const ReadItems = async (Name) => {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        const items = await Item.Inv.find({warehouseName: Name});
        if (items.length === 0) throw {status: 500, error: 'No items in warehouse'}
        mongoose.connection.close();
        return items;
    } catch (err) {
        mongoose.connection.close();
        throw err;
    }
}

module.exports = {
    AddItems,
    ReadItems
};