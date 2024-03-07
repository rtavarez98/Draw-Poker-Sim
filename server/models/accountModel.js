const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    username: String,
    password: String,
    wins: Number,
    losses: Number,
    ties: Number
});

module.exports = mongoose.model('account', accountSchema);