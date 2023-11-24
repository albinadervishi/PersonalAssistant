const cron = require("node-cron");
const User = require("./model/user.model");
const Wallet = require("./model/wallet.model");
const Transactions = require("./model/transactions.model");

const performMonthlyUpdate = async (userId) => {
  try {
    // Find the user by their id
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found", { userId });
      return;
    }

    //transaction data for user's wage
    const transactionData = {
      amount: user.wage.amount,
      wallet: user.wage.wallet,
      type: "deposit",
    };

    //create a new transaction with transaction data
    const transaction = await Transactions.create(transactionData);
    //update the user's wallet by inc the balance with their wage amount
    const updatedWallet = await Wallet.findByIdAndUpdate(
      user.wage.wallet,
      { $inc: { balance: user.wage.amount } },
      { new: true }
    );

    console.log("Deposit was successful", {
      userId: userId,
      transaction: transaction,
      wallet: updatedWallet,
    });
  } catch (err) {
    console.error("Error in performMonthlyUpdate", err);
  }
};

module.exports.monthlyTask = async () => {
  try {
    //get all users' IDs
    const users = await User.find({}, "_id").exec();
    //iterate over each user and perform the monthly update
    for (let user of users) {
      await performMonthlyUpdate(user._id.toString());
    }
  } catch (err) {
    console.error("Error fetching users for monthly update", err);
  }
};
