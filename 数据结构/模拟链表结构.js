function Chain(key, value) {
	this.next = null;
	this.key = key;
	this.value = value;
	this.length = 1;
}

// 插入元素
Chain.prototype.insertAfter = function (pos, key, value) {
	var currentObj = this;
	var addObj = {
		key  : key,
		value: value
	}
	while (currentObj.key !== pos) {
		currentObj = currentObj.next;
	}
	addObj.next = currentObj.next;
	currentObj.next = addObj;
	this.length++;
	return this;
}

// 删除元素
Chain.prototype.delele = function (key) {
	var last = null;
	var currentObj = this;
	while (currentObj.key !== key) {
		last = currentObj;
		currentObj = currentObj.next;
	}
	last.next = currentObj.next;
	this.length--;
	return this;
}

// 查找元素
Chain.prototype.find = function (key) {
	var currentObj = this;
	while (currentObj.key !== key) {
		currentObj = currentObj.next;
	}
	return currentObj.value;
}

var chainDemo = new Chain(1,'sss');
chainDemo.insertAfter(1,2,'ddd')
chainDemo.insertAfter(1,3,'fff')
console.log(chainDemo,'demo')
