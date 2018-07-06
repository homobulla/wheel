class Promise {
	constructor(fn) {
		this.status = 'Pending';
		this.success = null;
		this.error = null;

		setTimeout(() => {
			fn(
				(data) => {
					this.resolve(data);
				},
				(error) => {
					this.reject(error);
				}
			);
		});
	}

	resolve(data) {
		if (this.status === 'Pending') {
			this.success(data);
			this.status = 'Fulfilled';
		}
	}

	reject(error) {
		if (this.status === 'Pending') {
			this.error(error);
			this.status = 'Rejected';
		}
	}

	then(success, error) {
		this.success = success;
		this.error = error;
	}
}

function flatten(arr) {
	return [].concat(...arr.map((x) => (Array.isArray(x) ? flatten(x) : x)));
}

var a = Array(100)
	.fill()
	.map((_, i) => i + 1);
console.log(a);
