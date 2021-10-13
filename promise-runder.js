function run(gen) {
    var args = [].slice.call( arguments, 1), it;
    // 在当前上下文中初始化生成器 
    it = gen.apply( this, args );
    console.log(it, 'it');
    // 返回一个promise用于生成器完成 
    return Promise.resolve().then( function handleNext(value){ 
        // 对下一个yield出的值运行
    var next = it.next( value );
    console.log(next, 'next');
        return (function handleResult(next){ // 生成器运行完毕了吗?
            if (next.done) {
                return next.value;
                // return 111;

            }else { // 否则继续运行
                return Promise.resolve( next.value )
                .then(
                    // 成功就恢复异步循环，把决议的值发回生成器 
                    handleNext,
                    // 如果value是被拒绝的 promise， 
                    // 就把错误传回生成器进行出错处理 
                    function handleErr(err) {
                        return Promise.resolve(
                            it.throw( err )
                        ).then( handleResult );
                    }); 
                
                }
        })(next);

    // return Promise.resolve(99)
    } );
}



function foo1(x,y) {
    return Promise.resolve(5)
}
function foo2(x,y) {
    return Promise.resolve(6)
}
function foo3(x,y) {
    return Promise.resolve(7)
}
function *main() {
    try {
        // console.log(111);
        var text1 = yield foo1();
        // text1.then((res) => {
        //     console.log(res, 'text1');
        // })
        console.log(222);
        
        var text2 = yield foo2();
        var text3 = yield foo3();
        console.log( text1, text2, text3 );
    }
    catch (err) {
        console.error( err );
} }

var f = run(main)
// console.log(f, 'ff');
f.then((res) => {
    // console.log(55);
    console.log(res, 'res');
    // res.then(() => 77)
}).catch(err => {
    console.log(err);
})
// console.log(f.then);