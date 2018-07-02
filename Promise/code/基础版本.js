//https://juejin.im/post/5b16800fe51d4506ae719bae?utm_source=gold_browser_extension
// 基础版本
// 可以创建promise对象实例。
// promise实例传入的异步方法执行成功就执行注册的成功回调函数，失败就执行注册的失败回调函数。

function MyPromise(fn) {
    let _this = this;
    _this.value = null;
    _this.error = null;
    _this.onFulfilled = null;
    _this.onRejected = null;

    function resolve(value) {
        _this.value = value;
        _this.onFulfilled(_this.value); //resolve成功时执行回调
    }

    function reject(error) {
        _this.error = error;
        _this.onRejected(_this.error);  //失败时执行回调
    }

    fn(resolve,reject);
}

MyPromise.prototype.then = function(onFulfilled,onRejected) {
    // promie实例注册成功和失败回调
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
}

module.exports = MyPromise