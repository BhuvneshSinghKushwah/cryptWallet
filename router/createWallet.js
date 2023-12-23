const express = require('express');
const bitcoin = require('bitcoinjs-lib');
const {BIP32Factory} = require('bip32')
const ecc = require('tiny-secp256k1')
const bip32 = BIP32Factory(ecc)
const bip39 = require('bip39');

const router = express.Router();
router.use(express.json());

router.post('/:blockchain', async (req, res) => {
    const mnemonic = req.body.phrase;
    const blockchain = req.params.blockchain;
    const derivationCoin = (blockchain=='btc') ? '44' : '60';

    const derivationPath = `m/${derivationCoin}'/1'/0'/0/0`
    try {
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const root = bip32.fromSeed(seed);
        const child = root.derivePath(derivationPath);
        const privateKey = child.toWIF();

        const { address } = bitcoin.payments.p2pkh({ pubkey: child.publicKey });
        const publicKey = child.publicKey.toString('hex');
        console.log(publicKey);
        res.json({ 
            address: address,
            privatekey: privateKey,
            publickey: publicKey,
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

})

module.exports = router;