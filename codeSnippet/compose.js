function compose(middlewares) {
    return function(context, next) {
        let index = -1
        function exec(i) {
            if (i == middlewares.length) return Promise.resolve()
            // 将 index 作为判断 next 重复调用的判断条件
            if (i <= index) return Promise.reject(new Error('next 被多次调用!'))
            index = i
            try {
                return Promise.resolve(
                    middlewares[i](context, exec.bind(null, i + 1))
                )
            } catch (e) {
                return Promise.reject(e)
            }
        }
        return exec(0)
    }
}
