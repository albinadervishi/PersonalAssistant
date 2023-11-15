const TransactionsController = require("../controllers/transactions.controller");

module.exports = (app) => {
    app.get("/api/transactions/:userId", TransactionsController.findAllTransactions)
    app.post("/api/deposit/:userId", TransactionsController.createDeposit)
    app.post("/api/payment/:userId", TransactionsController.createPayment)
}