const { Router } = require('express');
const controller = require('../controllers');

const TransactionRouter = Router();

TransactionRouter.get('/', controller.TransactionController.getTransactions);
TransactionRouter.post(
  '/transact/:walletId',
  controller.TransactionController.initiateTransaction
);

module.exports = TransactionRouter;
