// graph 依赖关系图
let graph = {
    // entry 模块
    "src/entry.js": {
        code: "",
        dependencies: [ "./src/message.js" ],
        mapping: {
            "./message.js": "src/message.js"
        }
    },
    // message 模块
    "src/message.js": {
        code: "",
        dependencies: [],
        mapping: {}
    }
};

const flat = (arr) => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flat(b) : b), []);

var arr = [ 1, 2, [ 3, 43, [ 45, 11, 3333 ], 33, 4 ], 4, 5555 ];
console.log(flat(arr));
