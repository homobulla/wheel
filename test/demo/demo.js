
function debounce(fn, wait) {
    var timeout = null;
    return function() {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    };
}

[1,2,3].forEach(debounce(function(i){
	console.log(i)
},20))
