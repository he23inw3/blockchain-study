
const Block = require("./block");
const { DIFFUCULITY } = require("../config");

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
    console.log(block.toString());
  });

});
