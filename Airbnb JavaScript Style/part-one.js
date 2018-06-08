// 1 使用解构赋值

const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
    episodeOne: 1,
    twoJediWalkIntoACantina: 2,
    lukeSkywalker,
    episodeThree: 3,
    mayTheFourth: 4,
    anakinSkywalker,
};

// good
const obj = {
    lukeSkywalker,
    anakinSkywalker,
    episodeOne: 1,
    twoJediWalkIntoACantina: 2,
    episodeThree: 3,
    mayTheFourth: 4,
};

// 2 将多次点语法的方法缓存

// bad
console.log(object.hasOwnProperty(key));
// good
console.log(Object.prototype.hasOwnProperty.call(object, key));
// best
const has = Object.prototype.hasOwnProperty;
console.log(has.call(object, key));

//3 优先使用扩展符代替Object.assign浅拷贝

// very bad
const original = {
    a: 1,
    b: 2
};
const copy = Object.assign(original, {
    c: 3
}); // this mutates `original` ಠ_ಠ
delete copy.a; // so does this

// bad
const original = {
    a: 1,
    b: 2
};
const copy = Object.assign({}, original, {
    c: 3
}); // copy => { a: 1, b: 2, c: 3 }

// good
const original = {
    a: 1,
    b: 2
};
const copy = { ...original,
    c: 3
}; // copy => { a: 1, b: 2, c: 3 }

const {
    a,
    ...noA
} = copy; // noA => { b: 2, c: 3 }   依旧第一点的解构赋值

// 4 扩展运算符拷贝数组，将类数组转为数组
const foo = document.querySelectorAll('.foo');
// good
const nodes = Array.from(foo)
// best
const nodes = [...foo];

const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr; // first -> 1 second -> 2
const [first, ...second] = arr // first -> 1 second -> [2,3,4]

// 5默认参数
// bad
function getFullName(user) {
    const firstName = user.firstName;
    const lastName = user.lastName;

    return `${firstName} ${lastName}`;
}

// good
function getFullName(user) {
    const {
        firstName,
        lastName
    } = user;
    return `${firstName} ${lastName}`;
}

// best
function getFullName({
    firstName,
    lastName
}) {
    return `${firstName} ${lastName}`;
}
// bad
function handleThings(opts) {
    opts  = opts || {};
}
//good
function handleThings(opts = {}) {

}