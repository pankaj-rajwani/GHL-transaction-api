const WalletRoutes = require('./Wallet');
const TransactionRoutes = require('./Transaction');

module.exports = (app) => {
  app.use('/api/v1/wallet', WalletRoutes);
  app.use('/api/v1/transactions', TransactionRoutes);

  return app;
};
