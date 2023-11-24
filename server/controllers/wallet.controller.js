const Wallet = require("../model/wallet.model");
const User = require("../model/user.model");

module.exports.findAllWallets = (req, res) => {
  const { userId } = req.params;
  Wallet.find({ owner: userId })
    .populate("owner")
    .populate("transactions")
    .then((allWallets) => {
      res.json({ wallets: allWallets });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

module.exports.getWallet = (request, response) => {
  Wallet.findOne({ _id: request.params.id })
    .populate("owner")
    .populate("transactions")
    .then((wallet) => response.json(wallet))
    .catch((err) => response.json(err));
};

module.exports.createWallet = (request, response) => {
  const { userId } = request.params; //get userId from the request endpoint
  Wallet.create({
    owner: userId,
    ...request.body,
  })
    .then((request) => {
      response.status(200).json({ message: "Wallet was created", request });
    })
    .catch((err) => {
      console.log("Failed to create the wallet:", err);
      response.status(500).json({ error: "An error occurred" });
    });
};
