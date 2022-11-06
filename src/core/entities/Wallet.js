const mongoose = require('mongoose');
const { checkAmountValidity } = require('../utils/utils.functions');

const Schema = mongoose.Schema;

const walletSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      immutable: true,
      unique: true,
    },
    balance: {
      type: Number,
      required: true,
      set: (num) => checkAmountValidity(num),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wallet', walletSchema);
