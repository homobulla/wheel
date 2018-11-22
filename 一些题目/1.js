// 核心点在于用修改原始值的方法来修改this
Array.prototype.multiply = function() {
    let a = this.map(x => x * x)
    this.push(...a)
}
// https://juejin.im/post/5bf5610be51d452a1353b08d?utm_source=gold_browser_extension

const a = [1, 2, 3, 4, 5]
a.multiply()
console.log(a)
