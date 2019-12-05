var a = require("./module.js");
var b = require("./module.js");
// console.log(a === b, "require is only an address.");
// console.log(require.cache); // 会缓存模块

// module.exports = { b: 1 };
module.exports = {
    a,
    b
};
exports.c = 2;
// console.log(module.exports, exports);
