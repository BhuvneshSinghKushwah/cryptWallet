require('dotenv').config();

const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/:address/:blockchain/:network', async (req, res) => {
    const address = req.params.address;
    const blockchain = req.params.blockchain;
    const network = req.params.network;

    try {
        const response = await axios.get(`https://api.blockcypher.com/v1/${blockchain}/${network}/addrs/${address}/balance`);
        const balanceInSmalletsUnit = response.data.balance;
        let balance = '';

        if(blockchain == 'ethr')
        {
            const weiInEther = 10n ** 18n;
            balance = (BigInt(balanceInSmalletsUnit)/weiInEther).toString();
        }else if(blockchain == 'btc')
        {
            const satoshisInBitcoin = 100000000;
            balance = (parseFloat(balanceInSmalletsUnit)/satoshisInBitcoin).toFixed(8).toString();
        }

        console.log(response, balance);
        res.json({ "walletBalance": balance });

    } catch (err) {
        console.error(err);
        res.status(404).json({ message: err.message });
    }
});

module.exports = router;