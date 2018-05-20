
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

    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  it("ブロックチェーンの整合性検証で整合性が取れていないことを確認", () => {
    bc2.chain[0].data = "hogehoge";
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it("ブロックチェーンにブロックを追加した後にブロックが改竄されたことを検出することを確認", () => {
    bc2.addBlock("foo");
    bc2.chain[1].data = "foofoo";
    console.log(bc2);
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  })
})
