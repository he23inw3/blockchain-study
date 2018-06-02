
const SHA256 = require("crypto-js/sha256");
const DIFFICULTY = require("../config");

class Block {
  constructor(timestamp, lashHash, hash, data, nonce) {
    this.timestamp = timestamp;
    this.lastHash = lashHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
  }

  toString() {
    return `Block
      Timestamp : ${this.timestamp}
      lastHash: : ${this.lastHash}
      hash      : ${this.hash}
      data      : ${this.data}
      nonce     : ${this.nonce}
    `;
  }

  /**
   * ブロックチェーンに格納する一番最初のブロックを返す
   * @return Block("timestamp", "-----", "hr40jfwj", [], 0)
   */
  static genesis() {
    return new this("timestamp", "----", "h4r0-h123", [], 0);
  }

  /**
   * ブロックをマイニングする
   * @param {ブロックチェーンの一番新しいブロック} lastBlock
   * @param {格納するデータ} data
   */
  static mineBlock(lastBlock, data) {

    const lastHash = lastBlock.hash;
    let timestamp, hash;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      hash = Block.hash(timestamp, lastHash, data, nonce);
    } while (hash.substring(0, DIFFICULTY) !== "0".repeat(DIFFICULTY));

    return new Block(timestamp, lastHash, hash, data, nonce);
  }

  /**
   *
   * @param {タイムスタンプ} timestamp
   * @param {一つ前のブロックのハッシュ値} lastHash
   * @param {ブロックに格納するデータ} data
   * @param {ブロック採掘回数} nonce
   */
  static hash(timestamp, lastHash, data, nonce) {
    return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
  }

  /**
   * ブロックのハッシュ値を生成
   * @param {ブロック} block
   * @return ブロックのハッシュ値
   */
  static blockHash(block) {
    const {timestamp, lastHash, data, nonce} = block;
    return Block.hash(timestamp, lastHash, data, nonce);
  }
}

module.exports = Block;
