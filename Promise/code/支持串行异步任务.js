MyPromise.prototype.then = function(onFulfilled,onRejected) {
    let _this = this,
        brigePromise; // 异步返回一个新的promise对象再链式调用
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : error => {throw error};
    if (_this.status === FULFILLED) {
        return brigePromise = new MyPromise((resolve,reject) =>{
            setTimeout(()=>{
                try {
                    let x = onFulfilled(_this.value);
                    resolvePromise(brigePromise,x,resolve,reject);
                } catch (e) {
                    reject(e)
                }
            },0)
        })
    }
    if(_this.status === REJECTED) {
        return brigePromise = new MyPromise((resolve,reject) =>{
            setTimeout(()=>{
                try {
                    let x = onRejected(_this.error);
                    resolvePromise(brigePromise,x,resolve,reject);
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
    if (_this.status === PENDING) {
        return bridgePromise = new MyPromise((resolve, reject) => {
            _this.onFulfilledCallbacks.push((value) => {
                try {
                    let x = onFulfilled(value);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
            _this.onRejectedCallbacks.push((error) => {
                try {
                    let x = onRejected(error);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

}

MyPromise.prototype.catch = function(onRejected) {
    return this.then(null,onRejected);
}

function resolvePromise(bridgePromise,x,resolve,reject) {
    if (x instanceof MyPromise) {
        if (x.status === PENDING) {
            x.then(y=>{
                resolvePromise(brigePromise,y,resolve,reject)
            }), error => {
                reject(error);
            }
        }
    } else {
        resolve(x);
    }
}