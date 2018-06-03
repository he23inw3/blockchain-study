
const Block = require("./block");
const Config = require("../config");

const fooBlock = Block.mineBlock(Block.genesis(), "hoge");
console.log(Block.genesis().toString());
console.log(fooBlock.toString());
console.log("0".repeat(fooBlock.difficulty));
console.log(fooBlock.hash.substring(0, fooBlock.difficulty));
