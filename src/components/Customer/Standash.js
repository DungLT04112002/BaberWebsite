function outer() {
    var x = 1;
    function inner() {
        console.log(x);
    }
    return inner;
}
var closure = outer();
closure();