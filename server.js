require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Routes
const checkBalanceRouter = require('./router/checkBalance');
const createWalletRouter = require('./router/createWallet');
const seeWalletRouter = require('./router/seeWallets');

//Mongoose Database Connection
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log(`database succesfully connected`));

app.use(express.json());

//check balance of a wallet. localhost:3000/checkBalance/address/blockchain/network
app.use('/checkBalance', checkBalanceRouter);
//create wallet using bip39 mnemonic phrase.
app.use('/createWallet', createWalletRouter);
//returns a json of all the wallets stored in mongodb
app.use('/seeWallets', seeWalletRouter);

app.use('/', (req, res) => res.send('<h1>Welcome to Crypt Wallet</h1>'));

app.listen(process.env.PORT, () => console.log(`server listening at port ${process.env.PORT}`));