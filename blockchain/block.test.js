
const Block = require("./block");
const Config = require("../libs/mineConfig");

describe("Block", () => {

  let data, lastBlock, block;

  beforeEach(() => {
    data = "hiroki";
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });

  it("データのテスト", () => {
    expect(block.data).toEqual(data);
  });

  it("ハッシュのテスト", () => {
    expect(lastBlock.hash).toEqual(block.lastHash);
  });

  it("指定難易度のハッシュ値生成テスト", () => {
    expect(block.hash.substring(0, block.difficulty)).toEqual("0".repeat(block.difficulty));
  });

  it("低速ブロック採掘で難易度を下げるテスト", () => {
    expect(Block.adjustDifficulty(block, block.timestamp + Config.MINE_RATE)).toEqual(block.difficulty - 1);
  });

  it("高速ブロック採掘で難易度を上げるテスト", () => {
    expect(Block.adjustDifficulty(block, block.timestamp - Config.MINE_RATE)).toEqual(block.difficulty + 1);
  });
});
