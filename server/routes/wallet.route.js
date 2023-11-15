const WalletController = require("../controllers/wallet.controller");

module.exports = (app) => {
  app.get("/api/wallets/:userId", WalletController.findAllWallets);
  app.get("/api/wallet/:id", WalletController.getWallet);
  app.post("/api/wallet/:userId", WalletController.createWallet);
};
