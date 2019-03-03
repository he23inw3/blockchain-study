const TransactionPool = require("./transaction-pool");
const Transaction = require("./transaction");
const Wallet = require("./index");

describe("TransactionPool", () => {
    let tp, transaction, wallet;

    beforeEach(() => {
        tp = new TransactionPool();
        transaction = new Transaction();
        wallet = new Wallet();

        transaction = Transaction.newTransaction(wallet, "rec134nt", 30);
        tp.updateOrAddTransaction(transaction);
    });

    it("取引台帳の追加", () => {
        expect(tp.transactions.find(t => t.id == transaction.id)).toEqual(transaction);
    });

    it("取引台帳更新テスト", () => {
        const oldTransaction = JSON.stringify(transaction);
        const newTransaction = Transaction.newTransaction(wallet, "foo0-ew145", 40);
        tp.updateOrAddTransaction(newTransaction);

        expect(JSON.stringify(tp.transactions.find(t => t.id == newTransaction.id))).not.toEqual(oldTransaction);
    });
});
