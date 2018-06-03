
const Block = require("./block");
const logger = require("../libs/logger");

class BlockChain {

  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block);

    return block;
  }

  isValidChain(chain) {

    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];

      if (block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)) {
          return false;
      }
    }

    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      logger.error("ブロック数不足のため省略します。");
      return;
    } else if (!this.isValidChain(newChain)) {
      logger.error("ブロックチェーンデータ不備のため省略します。");
      return;
    }

    logger.info("最新ブロックチェーンデータを更新します。");
    this.chain = newChain;
  }
}

module.exports = BlockChain;
