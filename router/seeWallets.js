const express = require('express');
const Wallets = require('../model/wallets');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const wallets = await Wallets.find()
        res.status(200).json(wallets);
    } catch (err) {
        console.error(err);
        res.status(500).json({message:err.message});
    }
})

module.exports = router;