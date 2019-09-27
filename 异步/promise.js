/*
 * @Description: 实现一个符合A+规范的Promise
 * @Author: your name
 * @Date: 2019-09-27 16:15:11
 * @LastEditTime: 2019-09-27 18:28:30
 * @LastEditors: Please set LastEditors
 */
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise(executor) {
    let self = this;
    self.status = PENDING;
    self.onFulfilled = []; //then注册函数
    self.onRejected = []; // 失败回调函数

    // 带有resolve和reject两个函数
    function resolve(value) {
        // 只能响应首次的resolve或reject
        if (self.status === PENDING) {
            self.status = FULFILLED; // pending -> fulfilled;
            self.value = value;
            self.onFulfilled.forEach(fn => fn());
        }
    }

    function reject(reason) {
        if ((self.status = PENDING)) {
            self.status = REJECTED;
            self.reason = reason;
            self.onRejected.forEach(fn => fn());
        }
    }

    try {
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
    //PromiseA+ 2.2.1 / PromiseA+ 2.2.5 / PromiseA+ 2.2.7.3 / PromiseA+ 2.2.7.4
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
    onRejected =
        typeof onRejected === "function"
            ? onRejected
            : reason => {
                  throw reason;
              };
    let self = this;
    //PromiseA+ 2.2.7
    let promise2 = new Promise((resolve, reject) => {
        if (self.status === FULFILLED) {
            //PromiseA+ 2.2.2
            //PromiseA+ 2.2.4 --- setTimeout
            setTimeout(() => {
                try {
                    //PromiseA+ 2.2.7.1
                    let x = onFulfilled(self.value);
                    console.log("zhewe", x, self.value, onFulfilled);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    //PromiseA+ 2.2.7.2
                    reject(e);
                }
            });
        } else if (self.status === REJECTED) {
            //PromiseA+ 2.2.3
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        } else if (self.status === PENDING) {
            self.onFulfilled.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
            self.onRejected.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        }
    });
    return promise2;
};

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError("Chaining cycle"));
    }
    if ((x && typeof x === "object") || typeof x === "function") {
        let used; // 只允许调用一次
        try {
            let then = x.then;
            // 如果再次链式调用，则再次传递出下去,将then方法挂载到x上
            if (typeof then === "function") {
                then.call(
                    x,
                    y => {
                        //PromiseA+2.3.3.1
                        if (used) return;
                        used = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    r => {
                        //PromiseA+2.3.3.2
                        if (used) return;
                        used = true;
                        reject(r);
                    }
                );
            } else {
                // 否则直接resolve
                //PromiseA+2.3.3.4
                if (used) return;
                used = true;
                resolve(x);
            }
        } catch (e) {
            if (used) return;
            used = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}
Promise.defer = Promise.deferred = function() {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};
module.exports = Promise;
