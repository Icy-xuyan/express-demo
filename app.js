const express = require('express')
const path = require('path')

const db = require('./db')

/**
 * express中使用art-template步骤
 * 1. 安装
 *  yarn add art-template express-art-template 
 * 2. 给app设置模板
 *  app.engine('html',require('express-art-template'))
 * 3. res.render(模板路径 || 都配置好了就是模板文件名,数据)
 */
const app = express()
// view engine setup
app.engine('html', require('express-art-template'))
//设置模板引擎的默认路径 不设置默认也是views
app.set('views', path.join(__dirname, 'views'))
//设置模本文件的后缀名为html
app.set('view engine', 'html')

//处理静态资源
app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    // let filePath = path.join(__dirname, 'views', 'index.html')
    db.readFile(data => {
        res.render('index', data)
    })
})

app.get('/index', (req, res) => {
    res.redirect('/')
})

app.get('/add', (req, res) => {
    // let filePath = path.join(__dirname, 'views', 'add.html')
    // res.sendFile(filePath)
    //使用了模板引擎可简写如下
    res.render('add')
})

app.get('/delete', (req, res) => {
    let id = req.query.id
    db.readFile(data => {
        data.list = data.list.filter(item => item.id !== +id)
        db.writeFile(data, function () {
            res.redirect('/')
        })
    })
})


app.listen(9999, () => {
    console.log('服务器启动成功 http://localhost:9999');
})