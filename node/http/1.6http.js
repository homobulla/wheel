const http = require("http");
const Emitter = require("events");

class WebServer extends Emitter {
    constructor() {
        super();
        this.middleware = [];
        this.context = Object.create({});
    }
    /**
     * @description: 服务事件监听
     * @param {*} args
     * @return:
     */
    listen(...args) {
        const server = http.createServer(this.callback());
        return server.listen(...args);
    }
    /**
     * @description: 注册使用中间件
     * @param {function} fn
     * @return:
     */
    use(fn) {
        if (typeof fn === "function") {
            this.middleware.push(fn);
        }
    }
    /**
     * @description: 中间件回调方法
     * @param null
     * @return:
     */
    callback() {
        let _this = this;
        if (this.listeners("error").length === 0) {
            this.on("error", this.onerror);
        }

        const handleRequest = (req, res) => {
            // 统一req,res
            let context = _this.createContext(req, res);
            this.middleware.forEach((cb, idx) => {
                try {
                    cb(context);
                } catch (err) {
                    _this.onerror(err);
                }

                if (idx + 1 >= _this.middleware.length) {
                    if (res && typeof res.end === "function") {
                        res.end();
                    }
                }
            });
        };
        return handleRequest;
    }

    /**
     * @description: 异常处理监听
     * @param {type}
     * @return:
     */
    onerror(err) {
        console.log(err);
    }
    /**
     * @description: 创建通用上下文
     * @param {type}
     * @return:
     */
    createContext(req, res) {
        let context = Object.create(this.context);
        context.req = req;
        context.res = res;
        return context;
    }
}
module.exports = WebServer;
