const fs = require('fs')

const route = (pathname,handle,res,params) => {
    if(typeof handle[pathname] === 'function') {
        handle[pathname](res,params)
    }
    else {
         handle.notFound(res)
    }
}

module.exports = {
    route
}