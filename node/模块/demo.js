const test = require("./test");
console.log(test);
navigator.storage.persist("a", "1111").then(res => {
    console.log(res);
});
