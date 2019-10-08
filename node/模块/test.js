require("./module.js");

// console.log(require.cache);
// exports = {
//     a: 1
// };
module.exports = { b: 1 };
console.log(module.exports, JSON.stringify(exports));
