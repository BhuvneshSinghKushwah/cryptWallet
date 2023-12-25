const express = require('express');
const bitcoin = require('bitcoinjs-lib');
const {BIP32Factory} = require('bip32')
const ecc = require('tiny-secp256k1')
const bip32 = BIP32Factory(ecc);
const bip39 = require('bip39');

const Wallet = require('../model/wallets');

const router = express.Router();
router.use(express.json());

const addToMongoose = (phrase, address, pubKey, prvKey, blockchain) => {
    const newWallet = new Wallet({
        phrase: phrase,
        address: address,
        pubKey: pubKey,
        prvKey: prvKey,
        blockchain: blockchain
    })

    try {
        newWallet.save();
        console.log('data successfully saved');
    } catch (err) {
        console.error(err);
    }
};

const createWallet = async (mnemonic, derivationCoin, idx) => {
    let uniqueAddress = false;

    while(!uniqueAddress)
    {
        try {
            const derivationPath = `m/${derivationCoin}'/1'/0'/0/${idx}`
            const seed = await bip39.mnemonicToSeed(mnemonic);
            const root = bip32.fromSeed(seed);
            const child = root.derivePath(derivationPath);
            
            const privateKey = child.toWIF();
    
            const { address } = bitcoin.payments.p2pkh({ pubkey: child.publicKey });
            const publicKey = child.publicKey.toString('hex');

            const existingWallet = await Wallet.findOne({address: address});
            if(!existingWallet)
            {
                return {address, privateKey, publicKey};
            }
        } catch (err) {
            console.error(err)
        }
        idx++;
    }
};

router.post('/:blockchain', async (req, res) => {
    const mnemonic = req.body.phrase;
    const blockchain = req.params.blockchain;
    const derivationCoin = (blockchain=='btc') ? '44' : '60';

    const derivationPath = `m/${derivationCoin}'/1'/0'/0/0`
    try {
        const obj = await createWallet(mnemonic, derivationCoin, 0);
        const address = obj.address;
        const publicKey = obj.publicKey;
        const privateKey = obj.privateKey;

        await addToMongoose(mnemonic, address, publicKey, privateKey, blockchain);

        res.status(200).json({
            message: 'Wallet information saved successfully',
            address: address,
            publicKey: publicKey,
            blockchain: blockchain
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

})

module.exports = router;