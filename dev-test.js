
const Block = require("./block");

const block = new Block("sato", "suzuki", "yamdata", "kitagawa");

console.log(block.toString());
console.log(Block.genesis().toString());

const fooBlock = Block.mineBlock(Block.genesis(), "hoge");

console.log(fooBlock.toString());
