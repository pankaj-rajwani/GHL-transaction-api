const schema = require('../../entities');
const constants = require('./utils/constants');

const initiateTransaction = async (req, res) => {
  try {
    const { walletId } = req.params;
    const { amount, description } = req.body;

    if (amount === 0) {
      return res.status(400).json({
        status: false,
        message: constants.INVALID_AMOUNT_ERROR_TEXT,
      });
    }

    const wallet = await schema.Wallet.findOne({ _id: walletId }).catch(() => {
      return res.status(404).json({
        status: false,
        message: constants.FETCH_WALLET_BY_ID_ERROR_TEXT,
      });
    });

    if (amount < 0 && Math.abs(amount) > wallet.balance) {
      return res.status(400).json({
        status: false,
        message: constants.INSUFFICIENT_BALANCE_TEXT,
      });
    }

    const updatedBalance = Number(wallet.balance) + Number(amount);

    const transaction = await schema.Transaction.create({
      type: amount < 0 ? 'DEBIT' : 'CREDIT',
      description,
      amount,
      walletId,
      balanceBefore: Number(wallet.balance),
      balanceAfter: updatedBalance,
    });

    wallet.balance = updatedBalance;
    await wallet.save();

    return res.status(201).json({
      status: true,
      message: constants.INITIATE_TRANSACTION_SUCESS_TEXT,
      data: {
        balance: updatedBalance,
        transactionId: transaction._id,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: constants.INITIATE_TRANSACTION_ERROR_TEXT + '\n' + err,
    });
  }
};

const getTransactions = async (req, res) => {
  const { walletId, skip, limit } = req.query;

  try {
    const result = await schema.Transaction.find({ walletId })
      .limit(limit * 1)
      .skip(skip * 1)
      .exec();

    const count = await schema.Transaction.countDocuments({
      walletId: walletId,
    });

    return res.status(200).json({
      status: true,
      message: constants.GET_TRANSACTIONS_SUCCESS_TEXT,
      data: { trnxs: result, totalPages: parseInt(count) },
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: constants.GET_TRANSACTIONS_ERROR_TEXT + '\n' + err,
    });
  }
};

module.exports = { initiateTransaction, getTransactions };
