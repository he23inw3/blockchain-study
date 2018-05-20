
const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(timestamp, lashHash, hash, data) {
    this.timestamp = timestamp;
    this.lastHash = lashHash;
    this.hash = hash;
    this.data = data;
  }

  toString() {
    return `Block
      Timestamp : ${this.timestamp}
      lastHash: : ${this.lastHash}
      hash      : ${this.hash}
      data      : ${this.data}
    `;
  }

  static genesis() {
    return new this("timestamp", "----", "hr40jfwj", []);
  }

  static mineBlock(lastBlock, data) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = Block.hash(timestamp, lastHash, data);

    return new Block(timestamp, lastHash, hash, data);
  }

  static hash(timestamp, lastHash, data) {
    return SHA256(`${timestamp}${lastHash}${data}`).toString();
  }

  static blockHash(block) {
    const {timestamp, lastHash, data} = block;
    return Block.hash(timestamp, lastHash, data);
  }
}

module.exports = Block;
