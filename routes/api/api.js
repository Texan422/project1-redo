const router = require('express').Router();
const {resolve} = require('path');
const { AddItems, ReadItems, UpdateItems, DeleteItems } = require('../../controllers/Items.js');

router.post('/:name', async (req, res) => {
    try {
        const data = await AddItems(req.params.name, req.body); //req.body -> all the values from the form data
        console.log(data);
        res.sendFile(resolve('public', 'views', `${req.params.name}.html`));
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:name', async (req, res) => {
    try {
        const items = await ReadItems(req.params.name);
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:name/:item', async (req, res) => {
    try {
        await DeleteItems(req.params.name, req.params.item);
        res.status(200).json({message: `${req.params.item} deleted`})
    } catch (err) {
        res.status(500).json({error: 'Unable to delete item'})
    }
})

router.put('/:name', async (req, res) => {
    try {
        await UpdateItems(req.params.name);
        res.status(200).json({message: `item updated`})
    } catch (err) {
        res.status(500).json({error: 'Unable to update item'})
    }
})

module.exports = router;