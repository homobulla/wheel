let arr = [1, 3, 4];
let iterator = arr[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

class Demo {
	constructor(name) {
		this.name = name;
	}
}

class D extends Demo {
	constructor() {
		super()
	}
}
var d = new D('d');

console.log(d)