
const BlockChain = require("./blockchain");
const Block = require("./block");

describe("ブロックチェーンのテスト", () => {

  let bc, bc2;
  beforeEach(() => {
    bc = new BlockChain();
    bc2 = new BlockChain();
  });

  afterEach(() => {
    bc = bc2 = null;
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
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it("ブロックチェーンの更新処理が正しく実行できることを確認", () => {
    bc2.addBlock("huga");
    bc.replaceChain(bc2.chain);

    expect(bc.chain).toEqual(bc2.chain);
  });

  it("ブロックチェーンの更新省略", () => {
    bc.addBlock("fuda");
    bc.replaceChain(bc2.chain);

    expect(bc.chain).not.toEqual(bc2.chain);
  })
})
