const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/', accountController.getAccount);
router.post('/newAcc', accountController.createAccount);
router.patch('/win', accountController.winIncrement);
router.patch('/loss', accountController.lossIncrement);
router.patch('/tie', accountController.tieIncrement);

module.exports = router;