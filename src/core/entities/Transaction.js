const mongoose = require('mongoose');
const { checkAmountValidity } = require('../utils/utils.functions');

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['CREDIT', 'DEBIT'],
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      set: (num) => checkAmountValidity(num),
    },
    walletId: {
      type: Schema.ObjectId,
      required: true,
      ref: 'Wallet',
    },
    balanceBefore: {
      type: Number,
      required: true,
      set: (num) => checkAmountValidity(num),
    },
    balanceAfter: {
      type: Number,
      required: true,
      set: (num) => checkAmountValidity(num),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
