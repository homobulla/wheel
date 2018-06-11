

// 利用setTimeout包裹，使其在then方法执行后再执行
function resolve(value) {
    setTimeout(() => {
        _this.value = value;
        _this.onFulfilled(_this.value); //resolve成功时执行回调
    },0)
   
}

function reject(error) {
    setTimeout(() => {
        _this.error = error;
        _this.onRejected(_this.error);  //失败时执行回调
    },0)

}