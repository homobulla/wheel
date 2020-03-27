const destructuringArray = (values, keys) => {
    try {
        const obj = {};
        if (typeof keys === "string") {
            // 将数组字符传转成真数组
            // $& 与 regexp 相匹配的子串
            keys = JSON.parse(keys.replace(/\w+/g, '"$&"'));
        }

        const iterate = (values, keys) =>
            keys.forEach((key, i) => {
                if (Array.isArray(key)) iterate(values[i], key);
                else obj[key] = values[i];
            });

        iterate(values, keys);

        return obj;
    } catch (e) {
        console.error(e.message);
    }
};

const myDestructuring = (values, keys) => {
    keys = JSON.parse(keys.replace(/\w+/g, '"$&"'));
    const result = {};
    const recursive = (keys, values) =>
        keys.forEach((key, i) => {
            if (!Array.isArray(key)) result[key] = values[i];
            else recursive(key, values[i]);
        });
    recursive(keys, values);
    return result;
};
console.log(myDestructuring([ 1, [ 2, 4 ], 3 ], "[a,[b],c]"));

// result // { a:1, b:2, c:3 }
