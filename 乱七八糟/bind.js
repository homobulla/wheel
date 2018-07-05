Function.prototype._bind = function(context) {
	let func = this;
	let params = [].slice.call(arguments, 1);
	let Fnop = function() {};
	let fbound = function() {
		params = params.concat([].slice.call(arguments, 0));
		return func.apply(this instanceof Fnop ? this : context, params);
	};
	Fnop.prototype = this.prototype;
	fbound.prototype = new Fnop();
	return fbound;
};
