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
        .then(res => {
            return Promise.resolve(
                setTimeout(() => {
                    res = res * 100;
                }, 1000)
            );
        })
        .then(res => {
            console.log(res, "res");
        });
}, 0);
