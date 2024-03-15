const accounts = require('../models/accountModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
SECRET_KEY = 'secret'; //placeholder

async function createAccount(req, res) {
    try {
        let usernameExists = await accounts.findOne({username: req.body.username});
        if(usernameExists !== null) {
            throw error;
        }

        let newAcc = await accounts.create({
            username: req.body.username,
            password: req.body.password,
            wins: 0,
            losses: 0,
            ties: 0
        });
        let token = jwt.sign({userId: newAcc._id, username: newAcc.username, wins: newAcc.wins, losses: newAcc.wins, ties: newAcc.ties}, SECRET_KEY);
        res.status(201).send({token, userId: newAcc._id, wins: newAcc.wins, losses: newAcc.losses, ties: newAcc.ties});
    } catch(err) {
        res.status(404).send({error: err});
    }
}

async function getAccount(req, res) {
    try{
        let acc = await accounts.findOne({username: req.query.username, password: req.query.password});

        if(acc === null) {
            throw error();
        }

        let token = jwt.sign({userId: acc._id, username: acc.username, wins: acc.wins, losses: acc.wins, ties: acc.ties}, SECRET_KEY);
        return res.send({token, userId: acc._id, wins: acc.wins, losses: acc.losses, ties: acc.ties})
    } catch(err) {
        res.status(404).send({error: err});
    }
}

async function winIncrement(req, res) {
    try{
        console.log(req);
        let searchFor = new mongoose.Types.ObjectId(req.body.userId);
        let update = await accounts.findOneAndUpdate( {_id: searchFor}, { $inc: {wins: 1} });
        return res.send({wins: update.wins});
    } catch(err) {
        console.error(err);
    }
}

async function lossIncrement(req, res) {
    try{
        let searchFor = new mongoose.Types.ObjectId(req.body.userId);
        let update = await accounts.findOneAndUpdate( {_id: searchFor}, { $inc: {losses: 1} });
        return res.send({losses: update.losses});
    } catch(err) {
        console.error(err);
    }
}

async function tieIncrement(req, res) {
    try{
        let searchFor = new mongoose.Types.ObjectId(req.body.userId);
        let update = await accounts.findOneAndUpdate( {_id: searchFor}, { $inc: {ties: 1} });
        return res.send({wins: update.ties});
    } catch(err) {
        console.error(err);
    }
}

module.exports = {createAccount, getAccount, winIncrement, lossIncrement, tieIncrement};