require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Routes
const checkBalanceRouter = require('./router/checkBalance');
const createWalletRouter = require('./router/createWallet');

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

app.use('/', (req, res) => res.send('<h1>Welcome to Crypt Wallet</h1>'));

app.listen(process.env.PORT, () => console.log(`server listening at port ${process.env.PORT}`));