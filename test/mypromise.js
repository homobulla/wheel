// 第一步：Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
function myPromise(task) {
    let that = this; // 缓存this
    that.status = "pending"; // 进行中的状态
    that.value = undefined; //初始值

    that.onResolvedCallbacks = []; // 存放成功后要执行的回调函数的序列
    that.RejectedCallbacks = []; // 存放失败后要执行的回调函数的序列
    // 该方法是将Promise由pending变成fulfilled
    function resolve(value) {
        if (that.status == "pending") {
            that.status = "fulfilled";
            that.value = value;
            that.onResolvedCallbacks.forEach(cb => cd(that.value));
        }
    }
    // 该方法是将Promise由pending变成rejected
    function reject(reason) {
        if (that.status == "pending") {
            that.status = "rejected";
            that.value = reason;
            that.RejectedCallbacks.forEach(cb => cd(that.value));
        }
    }

    try {
        // 每一个Promise在new一个实例的时候 接受的函数都是立即执行的
        task(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

// 第二部 写then方法，接收两个函数onFulfilled onRejected，状态是成功态的时候调用onFulfilled 传入成功后的值，失败态的时候执行onRejected，传入失败的原因，pending 状态时将成功和失败后的这两个方法缓存到对应的数组中，当成功或失败后 依次再执行调用
myPromise.prototype.then = function(onFulfilled, onRejected) {
    let that = this;
    if (that.status == "fulfilled") {
        onFulfilled(that.value);
    }
    if (that.status == "rejected") {
        onRejected(that.value);
    }
    if (that.status == "pending") {
        that.onResolvedCallbacks.push(onFulfilled);
        that.RejectedCallbacks.push(onRejected);
    }
};
const my = new myPromise();
my.resolve(111).then(res => {
    console.log(res);
});
