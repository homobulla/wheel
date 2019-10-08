/*
 * @Description: koa的中间件:
 洋葱模型，类栈 -> 先进后出 next机制 
 * @Author: your name
 * @Date: 2019-09-27 12:06:19
 * @LastEditTime: 2019-10-08 11:15:09
 * @LastEditors: Please set LastEditors
 */

// Promise实现
let context = {
    data: []
};

async function middleware1(ctx, next) {
    console.log(1);
    await next();
    console.log(6);
}

async function middleware2(ctx, next) {
    console.log(2);
    await next();
    console.log(5);
}
async function middleware3(ctx, next) {
    console.log(3);
    await next();
    console.log(4);
}

// Promise.resolve(
//     middleware1(context, async () => {
//         return Promise.resolve(
//             middleware2(context, async () => {
//                 return Promise.resolve(
//                     middleware3(context, async () => {
//                         return Promise.resolve();
//                     })
//                 );
//             })
//         );
//     })
// )
//     .then(() => {
//         console.log("end!");
//     })
//     .catch(err => {
//         console.log("报错 ");
//     });

// 抽象为一个函数实现
let middleware = [middleware1, middleware2, middleware3];
function compose(middleware) {
    if (!Array.isArray(middleware)) {
        throw new TypeError("middleware must be an Array.");
    }
    for (const fn of middleware) {
        if (typeof fn !== "function") {
            throw new TypeError("middleware must be a function.");
        }
    }

    return function(ctx, next) {
        //  本质上来讲还是对compose函数的异步流程没完全理解，middleware里的next函数会调用所有后续的中间件
        //  当第一次调用next函数，disptch函数会执行middleware.length次
        let index = -1; // 每个中间件只允许调用一次next
        return dispatch(0); // 从中间件第一个开始依次执行
        function dispatch(i) {
            if (i < index) {
                return Promise.reject(new Error("next() called multiple times"));
            }
            index = i;
            let fn = middleware[i];
            // if (i === middleware.length) {
            //     fn = next; //这里没搞懂 ，如果符合条件，上一步已经是undefined了
            // }
            // 走到最后一个中间件则开始释放栈，回溯每一层next
            if (!fn) {
                return Promise.resolve();
            }
            try {
                return Promise.resolve(
                    fn(ctx, async () => {
                        return dispatch(i + 1);
                    })
                );
            } catch (err) {
                return Promise.reject(err);
            }
        }
    };
}

compose(middleware)()
    .then(() => {
        console.log("end!");
    })
    .catch(err => {
        console.log(err);
    });
