function doSomethingElse() {
    let a = 1;
    a++;
    console.log(a);
}

// Promise.resolve(1111)
//     .then(function(res) {
//         return res;
//     })
//     .then(res => {
//         console.log(res + 1111);
//     })
//     .then(null, err => {
//         console.log("err:" + err);
//     });
Promise.resolve("foo")
    .then(null)
    .then(function(result) {
        console.log(result);
    });
