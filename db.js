const fs = require('fs')
const path = require('path')

let dbPath = path.join(__dirname, 'data.json')

function readFile(callback) {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if (err) return console.log('数据库文件读取失败')
        data = JSON.parse(data)
        callback && callback(data)
    })
}

function writeFile(data, callback) {
    data = JSON.stringify(data, null, 2)
    fs.writeFile(dbPath, data, err => {
        if (err) return console.log('数据库文件写入失败')
        callback && callback()
    })
}

module.exports = {
    readFile,
    writeFile
}