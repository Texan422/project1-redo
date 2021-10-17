const router = require('express').Router();
const {resolve} = require('path');

router.get('/:name', (req, res) => {
    res.sendFile(resolve('public', 'views', `${req.params.name}.html`));
})

module.exports = router;