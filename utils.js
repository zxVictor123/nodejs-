const add = (a,b) => {
    console.log(`${a},${b}两数之和为${a+b}`)
}

const counter = (arr) => {
    console.log(`[${arr}]这个数组的长度是${arr.length}`)
}
// commonjs的导出语法
module.exports = {
    add,
    counter
}
