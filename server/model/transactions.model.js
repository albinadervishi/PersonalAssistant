const mongoose = require('mongoose');
const User = require('../model/user.model');
const Wallet = require('../model/wallet.model');

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['deposit', 'payment']
    },
    note: String,
    date: {
        type: Date,
        default: Date.now
    },
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model("Transactions", transactionSchema);