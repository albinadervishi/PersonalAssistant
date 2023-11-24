const mongoose = require('mongoose');
const User = require('../model/user.model');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['todo', 'inProgress', 'done']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model("Task", taskSchema);