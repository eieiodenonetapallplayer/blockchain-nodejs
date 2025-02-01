const express = require('express');
const router = express.Router();
const Blockchain = require('../blockchain');

const myBlockchain = new Blockchain();

router.get('/blockchain', (req, res) => {
    res.json(myBlockchain);
});

router.post('/block', (req, res) => {
    const { data } = req.body;

    if (typeof data !== 'object' || data === null) {
        return res.status(400).json({ error: 'Data must be a JSON object' });
    }

    const newBlock = myBlockchain.createBlock(data);
    myBlockchain.addBlock(newBlock);

    res.status(201).json(newBlock);
});

module.exports = router;