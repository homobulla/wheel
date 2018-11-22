function debounce(fn, wait) {
    var timeout = null
    return function() {
        if (timeout !== null) clearTimeout(timeout)
        timeout = setTimeout(fn, wait)
    }
}
// 处理函数
function handle() {
    console.log(Math.random())
}
// 滚动事件
window.addEventListener('scroll', debounce(handle, 1000))

var throttle = function(func, delay) {
    var prev = Date.now()
    return function() {
        var context = this
        var args = arguments
        var now = Date.now()
        if (now - prev >= delay) {
            func.apply(context, args)
            prev = Date.now()
        }
    }
}
function handle() {
    console.log(Math.random())
}
window.addEventListener('scroll', throttle(handle, 1000))
