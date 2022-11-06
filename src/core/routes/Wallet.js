const { Router } = require('express');
const controller = require('../controllers');

const WalletRouter = Router();

WalletRouter.post('/setup', controller.WalletController.initialzeWallet);
WalletRouter.get('/:id', controller.WalletController.getWalletDetails);

module.exports = WalletRouter;
