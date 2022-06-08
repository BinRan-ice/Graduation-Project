//引入路由()直接实例化路由
const router=require('koa-router')()
//引入时间
const datetime = require('silly-datetime')
const {log}=console
//引入body响应
const initdata=require('../../config/init.js')
//引入resultdata文件
const result = require('../../config/resultdata.js')
//引入字段表
const Parameter = require('../../config/parameter.js')
//参数校验
const {Deathing,Richtext,Login} = require('../../config/checking.js')
//给键值对形式，以对象的形式提交上去
const Objecting = require('../../config/objecting.js')
// 上传图片
const {upload,uploadimg} = require('../../uploadimg/uploadimg.js')
//引入操作数据库的类
const {Databaseadd,Databasequery} = require('../../config/publicapi.js')
//新增确诊
router.post('/diagnosis',async ctx=>{
	//post接收数据：ctx.request.body(接收前端提交的数据)
	//console.log(ctx.request.body)	
	
	//给前端开发者的字段
	let arrpar = new Parameter(ctx.request.body).diagnosisPar()
	log(arrpar)
	//参数校验
	new Deathing(ctx,arrpar).DeathingFun('确诊')
	log('全部通过')
	//给键值对形式，以对象的形式提交上去
	let objdata = new Objecting(arrpar).objDiagnosis()
	//提交时间
	let time = JSON.stringify(datetime.format(new Date(),'YYYY-MM-DD HH:mm:ss'))
	//提交到集合
	let query = `db.collection('diagnosis').add({
		data:{diadata:${objdata},time:${time}}
	})`
	await new Databaseadd(ctx).dataBaseadd(query) 
})

//新增治愈
router.post('/cure',async ctx=>{
	//给前端开发者的字段
	let arrpar = new Parameter(ctx.request.body).curePar()
	//参数校验
	new Deathing(ctx,arrpar).DeathingFun('治愈')
	//给键值对形式，以对象的形式提交上去
	let objdata = new Objecting(arrpar).objcure()
	//提交时间
	let time = JSON.stringify(datetime.format(new Date(),'YYYY-MM-DD HH:mm:ss'))
	//提交到集合
	let query = `db.collection('curedata').add({
		data:{diadata:${objdata},time:${time}}
	})`
	await new Databaseadd(ctx).dataBaseadd(query) 
})

//新增死亡
router.post('/death',async ctx=>{
	//给前端开发者的字段
	let arrpar = new Parameter(ctx.request.body).deathPar()
	log(arrpar)
	//参数校验
	new Deathing(ctx,arrpar).DeathingFun('死亡')
	//给键值对形式，以对象的形式提交上去
	let objdata = new Objecting(arrpar).objdeath()
	//提交时间
	let time = JSON.stringify(datetime.format(new Date(),'YYYY-MM-DD HH:mm:ss'))
	//提交到集合
	let query = `db.collection('deathdata').add({
		data:{diadata:${objdata},time:${time}}
	})`
	await new Databaseadd(ctx).dataBaseadd(query) 
})

// 健康信息数据获取
router.get('/triping',async ctx=>{
	log('123')
	// get请求集合所有数据
	let query = `db.collection('tripdata').get()`
	await new Databasequery(ctx).dataBasequery(query,'tp')
})

// 富文本上传图片
router.post('/articleimg', upload.single('file'), async ctx=>{
	// file对象涉及图片视频等的前端需要fromdata提交
	// 上传图片是在ctx.req.file
	// 其他值也是在ctx.req.body
	// 前端开发者图片的字段就是file
	try{
		let articleimg = await uploadimg(ctx.req.file.path)
		new initdata(ctx,'SUCCESS',articleimg).listing()
	}catch(e){
		new initdata(ctx).tips('FAIL',500)
	}
})

// 文章上传到集合
router.post('/article', upload.single('file'), async ctx=>{
	// 给前端了开发者的字段
	let {title,author,file,article} = ctx.req.body
	// 参数校验
	new Richtext(ctx,[title,author,article]).richtextFun()
	// 上传到集合：分两步，列表页一个集合，文章页一个集合
	// 列表页：标题——封面图——作者
	// 详情页：标题——作者——时间——内容
	// 列表页和文章页的唯一标识id字段
	let articId = new Date().getTime()
	
	// 封面图上传到阿里云
	let ossimg = await uploadimg(ctx.req.file.path)
	// 1.列表页：提交到集合
	// 时间
	let time = JSON.stringify(datetime.format(new Date(), 'YYYY-MM-DD'))
	let query = `db.collection('articling').add({
		data:{images:'${ossimg}',titles:'${title}',authors:'${author}',articIds:'${articId}'}
	})`
	await new Databaseadd(ctx).dataBaseadd(query)
	// 2.文章页：提交到集合
	let querycontent = `db.collection('articlecontent').add({
		data:{titles:'${title}',authors:'${author}',times:${time},content:'${article}',articIds:'${articId}'}
	})`
	await new Databaseadd(ctx).dataBaseadd(querycontent)
})

// 登录
router.post('/login',async ctx=>{
	let {iphone,password} = ctx.request.body
	// 字段
	let arrpar  =[iphone,password]
	// 参数校验
	new Login(ctx,arrpar).loginFun()
	// 数据库查询账号和密码
	let query = `db.collection('adminuser').where({iphone:'${iphone}',password:'${password}'}).get()`
	await new Databasequery(ctx).dataBasequery(query,'vp')
})

module.exports=router.routes()