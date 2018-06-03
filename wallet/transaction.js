
const ChainUtil = require("../chain-util");
const logger = require("../libs/logger");

/**
 * トランザクションを扱うクラス
 */
class Transaction {

  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = []; // 取引明細
  }

  /**
   * トランザクションを生成
   * @param {送り元の口座} senderWallet
   * @param {受け手} recepient
   * @param {取引金額} amount
   */
  static newTransaction(senderWallet, recepient, amount) {

    // 取引金額が残高を超えていた場合
    if (amount > senderWallet.balance) {
      logger.error(`金額: ${amount}が残高超過しています`);
      return;
    }

    const transaction = new this();

    // 取引内容を追加
    transaction.outputs.push(...[
      {amount: senderWallet.balance - amount, address: senderWallet.publicKey},
      {amount, address: recepient}
    ]);

    return transaction;
  }
}

module.exports = Transaction;
