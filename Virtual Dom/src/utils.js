// 工具函数

// 缓存数组方法
export const isArray = Array.isArray;

// 判断是否为‘number' || ’string' 类型数据
export const isPrimitive = val => {
    const type = typeof val
    return type === 'number' || type === 'string'
}

// 数组合并
export const flattenArray = array => {
    return Array.prototype.concat.apply([], array)
}


