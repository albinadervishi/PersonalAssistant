const mongoose = require('mongoose');
const User = require('../model/user.model');
const Transactions = require('../model/transactions.model');


const walletSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    currency: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transactions'
    }]
});

module.exports = mongoose.model('Wallet', walletSchema);