
const Transaction = require("./transaction");
const Wallet = require("./index");

describe("トランザクション", () => {

  let amount, recepient, transaction, wallet;

  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recepient = 'r2c1e0p24nt';
    transaction = Transaction.newTransaction(wallet, recepient, amount);
  });

  it("残高差し引きテスト", () => {
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
      .toEqual(wallet.balance - amount);
  });

  it("送金のテスト", () => {
    expect(transaction.outputs.find(output => output.address === recepient).amount)
      .toEqual(amount);
  });

  describe("残高超過テスト", () => {
    beforeEach( () => {
      amount = 50000;
      transaction = Transaction.newTransaction(wallet, recepient, amount);
    });

    it("取引省略テスト", () => {
      expect(transaction).toEqual(undefined);
    });
  });
})
