const http = require('http')
const router = require('./route')
const url = require('url')
const querystring = require('querystring')

const startServer = (handle) => {
    const server = http.createServer((req, res) => {
        const pathname = url.parse(req.url).pathname
        // 12.处理GET请求，获取当前路径中的携带参数的方法,true代表解析
        // const params = url.parse(req.url,true).query
        // 处理POST请求
        let data = []
        req.on('error', (err) => {
            console.log(err)
            // POST发送的是http body，是一种Buffer，将多个Buffer chunk逐个推入data数组
        }).on('data', (chunk) => {
            data.push(chunk)
        }).on('end', () => {
            // 处理POST请求
            if(req.method === 'POST') {
                // 对这个Buffer数组进行拼接形成完整Buffer，再进行字符串转化，就有了最终字符串数据
                data = Buffer.concat(data).toString()
                console.log(querystring.parse(data))
                router.route(pathname, handle, res,querystring.parse(data) )
            }
            // 处理GET请求
            else {
                const params = url.parse(req.url,true).query
                router.route(pathname, handle, res, params)
            }
        })
        
    })
    server.listen(3000, '127.0.0.1')
}

module.exports = {
    startServer
}