let proxy = new Proxy(
    {},
    {
        get: (target, property) => {
            return 35
        },
        set: property => {
            console.log('set in unuse')
        }
    }
)
let target = Object.create(proxy)
target.time = 4
console.log(target.time)
