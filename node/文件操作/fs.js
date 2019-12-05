/*
 * @Description: 文件操作 fs模块
 * @Author: your name
 * @Date: 2019-10-10 16:17:40
 * @LastEditTime: 2019-10-10 16:47:22
 * @LastEditors: Please set LastEditors
 */
//  new Buffer -> Buffer.from
// 字符串到二进制的互相转化
let one = Buffer.from("hello", "utf-8");
console.log(one.toString("utf-8"));
const fs = require("fs");
const path = require("path");
function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function(file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}

travel(__dirname.split("node")[0] + "/node", function(pathname) {
    console.log(pathname);
});
