var mycar = 'my value';
(function() {
    console.log(mycar);
    let mycar = 'local car';
})();

function Person(name) {
    this.name = name;
}
Person.prototype.age = 20;
Person.prototype.award = [];
var jack = new Person('jack');
var rose = new Person('rose');
console.log(jack.award === rose.award, jack.age === rose.age);
jack.age++;
rose.award.push('ocar');
console.log(rose.age);
console.log(jack.award);
