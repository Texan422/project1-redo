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

const DeleteItems = async (warehouseName, itemName) => {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        await Item.Inv.deleteOne({warehouseName, itemName});
        mongoose.connection.close();
        return;
    } catch (err) {
        mongoose.connection.close();
        throw err;
    }
}

const UpdateItems = async (param) => {
    const updates = param.split(',');
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        await Item.Inv.updateOne({warehouseName: updates[0], itemName: updates[1]}, {itemName: updates[2], SKU: updates[3]});
        mongoose.connection.close();
        return;
    } catch (err) {
        mongoose.connection.close();
        throw err;
    }
}

module.exports = {
    AddItems,
    ReadItems,
    UpdateItems,
    DeleteItems
};