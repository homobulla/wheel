let proxy = new Proxy(
    { num: 1 },
    {
        get: (target, property) => {},
        set: property => {
            console.log("set in unuse");
        }
    }
);
let target = Object.create(proxy);
target.time = 4;
console.log(target.time);
console.log(target.time);
console.log(target.time);
