const curry = fn => {
    const _c = args =>
        function() {
            const a = args.concat([...arguments])
            return a.length >= fn.length ? fn.apply(null, a) : _c(a)
        }
    return _c([])
}
