let arr = [[1,1,0],[1,0,1],[0,0,0]];
function my(flag){
    return ~flag + 2;
}    
var ret= []
arr.forEach(i =>{
      console.log(my([...[...i].reverse()]))
      

})
console.log(ret)

