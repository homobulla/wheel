var str = 'HeLLo';
var toLowerCase = function(str) {
    if(typeof str != 'string') {
        return;
    }
    var ret = '';
    [...str].map(i=>{
        ret += i.toLowerCase();
    })

    return ret;
};
var ret = toLowerCase(str)
console.log(ret)