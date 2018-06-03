
const SHA256 = require("crypto-js/sha256");
const Config = require("../libs/mineConfig");

class Block {

  constructor(timestamp, lashHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.lastHash = lashHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty || Config.DIFFICULTY;
  }

  toString() {
    return `Block
      Timestamp  : ${this.timestamp}
      lastHash:  : ${this.lastHash}
      hash       : ${this.hash}
      data       : ${this.data}
      nonce      : ${this.nonce}
      difficulty : ${this.difficulty}
    `;
  }

  /**
   * ブロックチェーンに格納する一番最初のブロックを返す
   * @return Block("timestamp", "-----", "hr40jfwj", [], 0, 3)
   */
  static genesis() {
      return new this("timestamp", "-----", "h4r0-h123", [], 0, Config.DIFFICULTY);
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
    let { difficulty } = lastBlock;
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = this.adjustDifficulty(lastBlock, timestamp);
      hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return new Block(timestamp, lastHash, hash, data, nonce, difficulty);
  }

  /**
   *
   * @param {タイムスタンプ} timestamp
   * @param {一つ前のブロックのハッシュ値} lastHash
   * @param {ブロックに格納するデータ} data
   * @param {ブロック採掘回数} nonce
   * @param {採掘難易度} difficulty
   */
  static hash(timestamp, lastHash, data, nonce, difficulty) {
    return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
  }

  /**
   * ブロックのハッシュ値を生成
   * @param {ブロック} block
   * @return ブロックのハッシュ値
   */
  static blockHash(block) {
    const {timestamp, lastHash, data, nonce, difficulty} = block;
    return Block.hash(timestamp, lastHash, data, nonce, difficulty);
  }

  static adjustDifficulty(lastBlock, currentTime) {
    let { difficulty } = lastBlock;
    difficulty = lastBlock.timestamp + Config.MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
    return difficulty;
  }
}

module.exports = Block;
