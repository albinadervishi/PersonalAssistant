const Wallet = require("../model/wallet.model");
const User = require("../model/user.model");
const Transactions = require("../model/transactions.model");

module.exports.findAllTransactions = (req, res) => {
  const { userId } = req.params;
  Transactions.find({ owner: userId })
    .populate("wallet")
    .then((allTransactions) => {
      res.json({ transactions: allTransactions });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

module.exports.createDeposit = (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid deposit amount" });
  }

  const transactionData = {
    owner: userId,
    type: "deposit",
    ...req.body,
  };

  Transactions.create(transactionData)
    .then((transaction) => {
      //update the wallet balance
      return Wallet.findByIdAndUpdate(
        req.body.wallet,
        { $inc: { balance: amount } },
        { new: true }
      ).then((updatedWallet) => {
        res.status(200).json({
          message: "Deposit was successful",
          transaction: transaction,
          wallet: updatedWallet,
        });
      });
    })
    .catch((err) => {
      console.log("Failed to create the transaction", err);
      res
        .status(500)
        .json({ error: "An error occurred while creating the transaction" });
    });
};

module.exports.createPayment = (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid deposit amount" });
  }

  const transactionData = {
    owner: userId,
    type: "payment",
    ...req.body,
  };

  Transactions.create(transactionData)
    .then((transaction) => {
      return Wallet.findByIdAndUpdate(
        req.body.wallet,
        { $inc: { balance: -amount } },
        { new: true }
      ).then((updatedWallet) => {
        res.status(200).json({
          message: "Payment was successful",
          transaction: transaction,
          wallet: updatedWallet,
        });
      });
    })
    .catch((err) => {
      console.log("Failed to create the transaction", err);
      res
        .status(500)
        .json({ error: "An error occurred while creating the transaction" });
    });
};

//   module.exports.scheduleDepositTasks = (req, res) => {
//     cron.schedule('0 0 1 * *', function() {
//       console.log('Running a task every month');
//       const { userId} = req.params;

//     const transactionData = {
//       owner: userId,
//       type: 'deposit',
//       ...req.body,
//     };

//     Transactions.create(transactionData)
//     .then((transaction) => {
//         return Wallet.findByIdAndUpdate(
//           transaction.wallet, // Make sure this ID is correct
//           { $inc: { balance: amount } },
//           { new: true }
//         ).then((updatedWallet) => {
//           console.log("Deposit was successful", {
//             transaction: transaction,
//             wallet: updatedWallet
//           });
//         });
//       })
//       .catch((err) => {
//         console.log("Failed to create the transaction", err);
//       });
// });
//   };
