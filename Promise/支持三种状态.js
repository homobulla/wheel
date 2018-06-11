// 实现promise的三种状态。
// 实现promise对象的状态改变，改变只有两种可能：从pending变为fulfilled和从pending变为rejected。
// 实现一旦promise状态改变，再对promise对象添加回调函数，也会立即得到这个结果。

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(fn) {
    let _this = this;
    _this.value = null;
    _this.error = null;
    _this.status = PENDING;
    _this.onFulfilled = null;
    _this.onRejected = null;

    function resolve(value) {
        if(_this.status === 'PENDING') {
            setTimeout(() => {
                _this.status = FULFILLED;     // 成功之后立即 pending -> fulfiled
                _this.value = value;
                _this.onFulfilled(_this.value);
            },0)
        }
    }

    function reject(error) {
        if(_this.status === 'PENDING') {
            setTimeout(() => {
                _this.status = REJECTED;     // 成功之后立即 pending -> fulfiled
                _this.error = error;
                _this.onRejected(_this.error);
            },0)
        }
    }

    fn(resolve,reject);
}

MyPromise.prototype.then = function(onFulfilled,onRejected) {
    if (this.status === 'PENDING') {
        this.onFulfilled = onFulfilled;
        this.onRejected = onRejected;
    } else if (this.status === 'FULFILLED') {
        onFulfilled(this.value);
    } else {
        onRejected(this.error);
    }

    return this;
}

module.exports = MyPromise