const Item = require('../models/Items.js');
const mongoose = require('mongoose');

const AddItems = async (warehouseName, {itemName, SKU}) => {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        const item = new Item.Inv({warehouseName, itemName, SKU})
        // const inv = await Item.SNWest.find();
        // if(inv.length === 5) {
        //     throw {status: 406, error: 'Max capacity reached.'}
            // MAKE AN ERROR PAGE TO REPLACE THIS ^^^^
        // } else{
            await item.save();
            mongoose.connection.close();
            return {status: 200, message: `${itemName} created.`};
        // }
    } 
    catch (err) {
        mongoose.connection.close();
        throw err
    }
}

module.exports = {
    AddItems
};