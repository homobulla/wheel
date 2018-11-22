// 数组去重
;[3, 2, 2, 1, 1].filter((e, i, arr) => (arr.indexOf(e) == i ? true : false))

// 统计不同 DOM 数量
const num = [
    ...new Set([...document.querySelectorAll('*')].map(e => e.nodeName))
].length
