const fs = require('fs')
const home = (res) => {
    res.writeHead(200, {
        // 告诉服务器该以什么方式解析文本
        'Content-Type': 'text/html'
    })
    // 文件比较大，一般用流式传输
    fs.createReadStream(__dirname + '/home.html', 'utf-8').pipe(res)
}

const api = (res,params) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    // 数据比较小，直接用end方法传输
    // 由于end方法不接收json格式数据，所以用JSON的转字符串方法进行类型转换
    res.end(JSON.stringify(params))
}
const notFound = (res) => {
    res.writeHead(404, {
            'Content-Type': 'text/html'
        })
        fs.createReadStream(__dirname+'/notFound.html', 'utf-8').pipe(res)
}
module.exports = {
    home,
    api,
    notFound
}