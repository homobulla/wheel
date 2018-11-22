// 其实我们可以先用一个数组cache用来保存属性值(对象类型)，
// 再用一个标记变量来标记是否有环，然后遍历时判断这个属性值的类型是否为一个对象，
// 如果是，则判断这个属性值是否在那个cache数组里，如果在，则表明有环，如果不在，
// 则把这个属性值添加到数组里，再递归遍历这个属性值即可。
function cycleDetector(obj) {
    let hasCircle = false, //用一个变量去标记是否有环
        cache = [] //保存值为对象的属性值
    ;(function(obj) {
        Object.values(obj).forEach(value => {
            if (
                Object.prototype.toString.call(value) === '[object Object]' &&
                value !== null
            ) {
                const index = cache.indexOf(value)
                if (index !== -1) {
                    //如果cache中存在这个value，则表示有环
                    hasCircle = true
                    return
                } else {
                    cache.push(value)
                    arguments.callee(value)
                    if (!hasCircle) cache.pop() //递归调用后再判断是否有环，没有的话就把value从cache数组里弹出
                }
            }
        })
    })(obj)
    return hasCircle
}
