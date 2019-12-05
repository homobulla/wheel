let p1 = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
}).then(_ => {
    console.log(2);
});
console.log(3);

setTimeout(() => {
    let p2 = new Promise((resolve, reject) => {
        console.log(10);
        resolve(1);
    })
        .then(function(string) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    string += "bar";
                    resolve(string);
                }, 3000);
            });
        })
        .then(res => {
            console.log(res, "res");
        });
}, 0);

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("helloworld");
    }, 5000);
});
p.then(res => {
    console.log(res);
});
