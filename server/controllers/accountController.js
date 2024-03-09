const accounts = require('../models/accountModel');
const mongoose = require('mongoose');

async function createAccount(req, res) {
    console.log(req.body);
    try {
        let newAcc = await accounts.create({
            username: req.body.username,
            password: req.body.password,
            wins: 0,
            losses: 0,
            ties: 0
        });
        res.send(201);
    } catch(err) {
        console.error(err);
    }
}

async function getAccount(req, res) {//add check if can't find account
    try{
        let acc = await accounts.findOne({username: req.query.username, password: req.query.password});
        return res.send(acc);
    } catch(err) {
        console.error(err);
    }
}

async function winIncrement(req, res) {//test
    try{
        await accounts.findOneAndUpdate({}, { $inc: {wins: 1} });//find with object id
    } catch(err) {
        console.error(err);
    }
}

async function lossIncrement(req, res) {//test
    try{
        await accounts.findOneAndUpdate({}, { $inc: {losses: 1} });
    } catch(err) {
        console.error(err);
    }
}

async function tieIncrement(req, res) {//test
    try{
        await accounts.findOneAndUpdate({}, { $inc: {ties: 1} });
    } catch(err) {
        console.error(err);
    }
}

module.exports = {createAccount, getAccount, winIncrement, lossIncrement, tieIncrement};