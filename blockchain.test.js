
const BlockChain = require("./blockchain");
const Block = require("./block");

describe("ブロックチェーンのテスト", () => {

  let bc, bc2;
  beforeEach(() => {
    bc = new BlockChain();
    bc2 = new BlockChain();
  });

  it("ブロックチェーンを初期化", () => {
    expect(bc.chain[bc.chain.length - 1]).toEqual(Block.genesis());
  });

  it("ブロックチェーンにブロックを追加", () => {
    const data = "hoge";

    bc.addBlock(data);
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });

  it("ブロックチェーンの整合性検証", () => {
    bc2.addBlock("hoge");
  });
})
