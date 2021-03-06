
const ChainUtil = require("../chain-util");
const INITIAL_BALANCE = 500;
const Config = require("../libs/mineConfig");

class Wallet {
  constructor() {
    this.balance = Config.INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode("hex");
  }

  toString() {
    return `Wallet -
      publicKey :  ${this.publicKey.toString()}
      balance   :  ${this.balance}
    `;
  }
}

module.exports = Wallet;
