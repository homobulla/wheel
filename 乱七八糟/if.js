var x = 1;

function foo() {
    var x = x;
    //  var x = undefined;
    //  x = x = undefined
    console.log(x);
}

foo();
