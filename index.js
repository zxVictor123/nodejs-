// 1.var,let,const的区别
// var
// var i = 0
// i = 2
// console.log('i:', i)
// var i = 1
// console.log('i:', i)

// 这里可以看到，var声明的变量既可以被重新声明，也可以被重新修改

// let
// let j = 0
// j = 2
// console.log('j:', j)
//只运行这里可以看到，j可以被修改，
// let j = 1
// console.log('j:', j)
// 带上这里一块运行，发现报错SyntaxError: Identifier 'j' has already been declared，说明不能重复声明


// const
// const k = 0
// k = 2
// console.log('k:', k)
// 运行这里发现报错TypeError: Assignment to constant variable.说明const声明的变量无法被修改
// const k = 1
// console.log('k:', k)
// 运行这里发现报错SyntaxError: Identifier 'k' has already been declared，说明无法重新声明

// 总结，var声明的变量，可以修改，可以重新声明，let：不可重新声明，可以修改，const：不可重新声明，不可修改
// 而推荐默认使用const的原因如下：
// 其实主要就是防止误修改，不管是重新声明还是只改值，在大型项目中都是容易出现且不易察觉的错误
// 但是const声明的变量，除了对象和数组，基本都无法直接改，而对象和数组想要修改，都需要一些特定的方法
// 基本上这种改动都是程序员有意识地改而不是不小心的，所以允许这种改动并不会很危险

// 2.感受nodejs对于js的继承
// console.log('hello nodejs')
// console.info('hello nodejs')
// console.error('hello nodejs')
// setTimeout(() => {
//     console.log('timer' )
// }, 3000);

// var i = 0
// const timer = setInterval(() => {
//     console.log('i:', i)
//     if(i>= 5) {
//         console.log('i大于等于5,执行结束')
//         clearInterval(timer)
//     }    
//     i++
// }, 1000);

// 3.常用全局变量
// dirname获取当前文件目录路径
// console.log('当前文件目录是：',__dirname)
// filename获取当前目录所包含文件的路径
// console.log('当前目录运行的文件的路径',__filename)

// 4.回调函数
// 定义一个箭头函数
// const saybye = (name) => {
//     console.log(name+': bye')
// }
// 定义一个回调函数，可以传入一个函数和name，在回调函数内部执行传入的函数
// const callbackFunction = (callback, name) => {
//     callback(name)
// }
// 调用回调函数
// callbackFunction(saybye, '小明')

// 以上写法并不是开发中常用写法，以下为常用写法
// const callbackFunction = (callback, name) => {
//     callback(name)
// }
// callbackFunction(
//     (name) => {
//         console.log(name+': bye')
//     }, '小明'
// )

// 5.nodejs的模块化commonjs
// commonjs的导入语法
// const {add,counter} = require('./utils')

// add(3,6)
// counter([2,3,8,4])

// 6.事件
// 先导入事件对象
// const events = require('events')
// 创建事件发射器实例
// const newEmitter = new events.EventEmitter()
// 设置事件发射器，用on方法监听,其中两个参数分别为事件名称和回调函数
// newEmitter.on('someEvents',(message) => {
//     console.log(message)
// })

// 使用emit方法让触发someEvents事件,第二个参数为传入回调函数的参数
// newEmitter.emit('someEvents','这个事件触发了')

//7.文件读写
// 读取
// 先导入文件读写对象
// const fs = require('fs')

// const readMe = fs.readFileSync('./fileExample.txt', 'utf-8')

// console.log(readMe)
// 写入
// fs.writeFileSync('writeFileExample.txt',readMe)
// console.log('finished')

// 注：以上是同步写法，对于耗时较长的文件读写，会阻塞程序，影响后续程序执行，所以要用异步方法
// 前两个参数依旧是要读的文件名，解码方式，而后多一个回调函数，在异步操作执行完毕后调用
// const readMePlus = fs.readFile('./fileExample.txt','utf-8',(err,data) => {
//     console.log(`7:${data}`)
// })
// console.log('finished!!!')
// 运行完成可以看到finished!!!先于文本出现，说明程序没有等待耗时的文件读写操作，而是直接执行后续程序了

// 8.流和管道
// 流
// 使用流的方式读取文件，括号内，前者全局变量查找当前目录路径然后和后续文件名拼接上变为完整路径，所以后面的斜杠/不能省，否则目录名会和文件名直接连到一块，路径名称就出错了，并且txt也不能省，要写完整文件名包括后缀
// const myReadStream = fs.createReadStream(__dirname+'/fileExample.txt','utf-8')
// 流式方式写入文件，默认先清除掉文件的所有原本内容，再进行写入
// const myWriteStream = fs.createWriteStream(__dirname+'/writeStreamExample1.txt')
// a这里是完整读取的方法
// 注意不要和底下的写入代码一块解开注释，会有冲突
// let data = ''
// 这里的myReadStream本质上也是一个eventEmitter，所以可以使用on方法，其中的事件名称data是readStream专属的事件，代表获取到数据事件，后面是回调函数，参数代表获取到的数据,由于流是分块获取数组，而不是一次性完整获取，所以应该设置一个变量来将零散数据加到一起，这里为data，然后在data事件的回调里将chunk+=给data变量，（注意这里的data一个是自带事件，一个是我们自己定义的变量，不要混淆）最后再在事件发射器的end事件绑定上打印data的事件，此时data已经彻底完整，可以完整打印出来了
// myReadStream.on('data', (chunk) => {
//     data+=chunk
// })

// myReadStream.on('end', () => {
//     console.log(`8:${data}`)
// })

// b这里是读取并同步写入的方法
// myReadStream.on('data', (chunk) => {
//     myWriteStream.write(chunk)
// })

// myReadStream.on('end', () => {
//     console.log('读取并写入完成')
// })

//c直接写入某文本
// const textExample = 'Hello Hello Hello Hello Hello Hello Hello '
// myWriteStream.write(textExample)
// myWriteStream.end()
// myWriteStream.on('finish', () => {
//     console.log('直接写入文本完成')
// })

// 管道
// 对读取流使用管道方法，直接将读取到的内容传输进要写入的文件
// myReadStream.pipe(myWriteStream)

// 9.web服务器输出内容
// 读取html文件并写入
const http = require('http')
// const fs = require('fs')
// const myReadStream = fs.createReadStream(__dirname + '/index.html')
// let number = '1'
// const server = http.createServer((req, res) => {
//     console.log(`第${number}次打印request`)
//     res.writeHead(200, {
//         'Content-Type': 'text/html'
//     })
//     myReadStream.pipe(res)
//     number++
// }) 
// 创建服务器，传入请求和响应两个参数
const server = http.createServer((req,res) => {
    // 写请求头，指定状态码为200代表成功，设置content-type为app.../json代表json类型，此外纯文本用text/plain类型，html用text/html类型
    res.writeHead(200,{
        // 告诉服务器该以什么方式解析文本
        'Content-Type': 'application/json'
    })
    // 这里定义一个json格式的变量
    const obj = {
        name: 'iwen',
        age: 20
    }
    // 由于end方法不接收json格式数据，所以用JSON的转字符串方法进行类型转换
    res.end(JSON.stringify(obj))
})
server.listen(3000, '127.0.0.1')

console.log('服务器运行在3000端口上')