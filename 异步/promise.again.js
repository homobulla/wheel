/*
 * @Description: Promise A+ 规范的promise.
 * @Author: your name
 * @Date: 2019-09-29 11:09:12
 * @LastEditTime: 2019-10-08 14:13:19
 * @LastEditors: Please set LastEditors
 */

//  三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
function Promise(exectuor) {
    let self = this;
    self.status = PENDING;
    self.onFulfilled = [];
    self.onRejected = [];

    function resolve(value) {
        // 只能从 pending -> fulfilled
        // 一旦发生就不能改改变，固态化
        if (self.status === PENDING) {
            self.status = FULFILLED;
            self.value = value;
            self.onFulfilled.forEach(fn => fn());
        }
    }
    function reject(reason) {
        //  或 从 pending -> rejected
        if (self.status === PENDING) {
            self.status = REJECTED;
            self.reason = reason;
            self.onRejected.forEach(fn => fn());
        }
    }

    try {
        exectuor(resolve, reject);
    } catch (err) {
        console.log(err);
    }
}
// then 函数是一个micro异步
Promise.prototype.then = function(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
    onRejected =
        typeof onRejected === "function"
            ? onRejected
            : reason => {
                  throw reason;
              };

    let self = this;
    let promise2 = new Promise((resolve, reject) => {
        if (self.status === FULFILLED) {
            // setTimeout 模拟异步，无法实现micro
            setTimeout(() => {
                try {
                    let x = onRejected(self.value); // 获取then函数返回
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
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
    // 该函数返回一个新的promise
    return promise2;
};

/**
 * @description: 解析 then 返回的 promise
 * @param {type}
 * @return:
 */
function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
        throw new SyntaxError("");
    }
    // then回调是函数操作还是简单的输出
    if ((x && typeof x === "object") || typeof x === "function") {
        let used;
        try {
            let then = x.then;
            // 判断是否链式调用了
            if (typeof then === "function") {
                then.call(
                    x,
                    y => {
                        if (used) return;
                        used = true;
                        resolvePromise(promise, y, resolve, reject);
                    },
                    r => {
                        if (used) return;
                        used = true;
                        reject(r);
                    }
                );
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
