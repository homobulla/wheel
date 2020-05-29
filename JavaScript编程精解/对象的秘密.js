class Vec{
	constructor(x,y){
		this.x = x;
		this.y = y;
		return {x:x, y:y}
	}
	get length(){
		return Math.sqrt(this.x*this.x + this.y*this.y);
	}
	plus(x,y){
		return {
			x: this.x + x,
			y: this.y + y
		}

	}
	minus(x,y){
		return {
			x: this.x - x,
			y: this.y - y
		}
	}
}
console.log(new Vec(1, 2).plus(new Vec(2, 3)));