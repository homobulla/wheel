// 用uncaughtException或domain捕获异常，前者挂在全局捕获
// 代码执行路径里涉及到了C/C++部分的代码时，
// 如果不能确定是否会导致内存泄漏等问题，最好在处理完异常后重启程序比较妥当。

// 在异步代码里捕获错误可以通过创建一个子域来进行快速捕获而不需要多次重写

function async(request, callback) {
    // Do something.
    asyncA(request, function(data) {
        // Do something
        asyncB(request, function(data) {
            // Do something
            asyncC(request, function(data) {
                // Do something
                callback(data);
            });
        });
    });
}
const domain = require("domain");
var d = domain.create();

d.on("error", function(err) {
    console.log("err left", err, "err right");
});

d.run(function() {
    async("des", function(data) {
        response.writeHead(200);
        response.end(data);
    });
});
