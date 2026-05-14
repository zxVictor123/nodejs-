const http = require('http')

const startServer = (data) => {
    const server = http.createServer((req, res) => {
        // 写请求头，指定状态码为200代表成功，设置content-type为app.../json代表json类型，此外纯文本用text/plain类型，html用text/html类型
        res.writeHead(200, {
            // 告诉服务器该以什么方式解析文本
            'Content-Type': 'application/json'
        })

        // 由于end方法不接收json格式数据，所以用JSON的转字符串方法进行类型转换
        res.end(JSON.stringify(data))
    })
    server.listen(3000, '127.0.0.1')
}

module.exports = {
        startServer: startServer
    }