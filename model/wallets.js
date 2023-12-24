const mongoose = require('mongoose');

const walletSchema = mongoose.Schema({
    phrase: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pubKey: {
        type: String,
        required: true
    },
    prvKey: {
        type: String,
        required: true
    },
    blockchain: {
        type: String,
        requried: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

const myModel = mongoose.model('myModel', walletSchema);
module.exports = myModel;


