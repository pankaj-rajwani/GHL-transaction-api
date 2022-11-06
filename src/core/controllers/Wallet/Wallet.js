const schema = require('../../entities');
const constants = require('./utils/constants');

const initialzeWallet = async (req, res) => {
  try {
    const { name, balance } = req.body;

    if (balance && balance < 0) {
      return res.status(400).json({
        status: false,
        message: constants.NEGATIVE_BALANCE_TEXT,
      });
    }

    const wallet = await schema.Wallet.create({ name, balance: 0 });

    await schema.Transaction.create({
      type: 'CREDIT',
      description: 'Wallet Setup',
      amount: balance || 0,
      walletId: wallet._id,
      balanceBefore: 0,
      balanceAfter: balance || 0,
    });

    wallet.balance = balance || 0;
    const result = await wallet.save();

    return res.status(201).json({
      status: true,
      message: constants.WALLET_CREATE_SUCCESS_TEXT + ' ' + balance,
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: constants.WALLET_CREATE_ERROR_TEXT + ' ' + err,
    });
  }
};

const getWalletDetails = async (req, res) => {
  const { id } = req.params;

  await schema.Wallet.findById(id)
    .then((result) => {
      return res.status(200).json({
        status: true,
        data: result,
      });
    })
    .catch((err) => {
      return res.status(404).json({
        status: false,
        message:
          constants.GET_WALLET_DETAILS_ERROR_TEXT + ' ' + id + '\n' + err,
      });
    });
};

module.exports = { initialzeWallet, getWalletDetails };
