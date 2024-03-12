const accounts = require('../models/accountModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
SECRET_KEY = 'secret'; //placeholder

async function createAccount(req, res) {
    try {
        //check if username exists + throw error if true
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
        let token = jwt.sign({username: newAcc.username, wins: newAcc.wins, losses: newAcc.wins, ties: newAcc.ties}, SECRET_KEY);
        res.status(201).send({token});
    } catch(err) {
        res.status(404).send({error: err});
    }
}

async function getAccount(req, res) {//add check if can't find account
    try{
        let acc = await accounts.findOne({username: req.query.username, password: req.query.password});

        if(acc === null) {
            throw error();
        }

        let token = jwt.sign({username: acc.username, wins: acc.wins, losses: acc.wins, ties: acc.ties}, SECRET_KEY);
        return res.send({token})
    } catch(err) {
        res.status(404).send({error: err});
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