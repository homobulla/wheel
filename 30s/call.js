// 将一个数组按照size切割成以size为长度的多个数组
const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    )
chunk([1, 4, 55, 44, 6, 8], 4)

// 使用闭包和展开运算符(...)将参数数组映射到函数的输入
const spreadOver = fn => argsArr => fn(...argsArr)
const arrMax = spreadOver(Math.max)
arrMax([1, 34, 300])
