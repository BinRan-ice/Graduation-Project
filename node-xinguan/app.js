const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
//引入操作post提交接收数据的模块
const bodyParser = require('koa-bodyparser')
//()直接实例化路由
const router = require('koa-router')()
//解决跨域问题
const cors = require('koa-cors')
//全局异常处理中间件
const abnormal = require('./config/abnormal.js')

app.use(cors())
app.use(json())
app.use(bodyParser())
app.use(abnormal)

//引入newly文件里的路由接口
const newlydata = require('./routers/newly/newly.js')

//配置路由接口
router.use('/api/newly',newlydata)
//启动路由
app.use(router.routes()).use(router.allowedMethods())

//端口
app.listen(7000)
console.log('启动成功')