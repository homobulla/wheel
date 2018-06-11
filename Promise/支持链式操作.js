const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(fn) {
    let _this = this;
    _this.value = null;
    _this.error = null;
    _this.status = PENDING;
    _this.onFulfilledCallbacks = [];
    _this.onRejectedCallbacks  = [];

    function resolve(value) {
        if(_this.status === PENDING) {
            setTimeout(() =>{
                _this.status = FULFILLED;
                _this.value = value;
                _this.onFulfilledCallbacks.forEach(callback => {
                    callback(_this.value)
                });
            },0)
        }  
    }

    function reject(error) {
        if(_this.status === PENDING) {
            _this.status = REJECTED;
            _this.error = error;
            _this.onRejectedCallbacks.forEach(callback =>{
                callback(_this.error)
            })
        }
    }
    fn(resolve,reject);
}

MyPromise.prototype.then = function(onFulfilled,onRejected){
    if(this.status === PENDING) {
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
    } else if(this.status === FULFILLED) {
        onFulfilled(this.value)
    } else {
        onRejected(this.error)
    }
    return this;
}

module.exports = MyPromise