//自定义全局异常处理中间件
const result = require('./resultdata.js')

let abnormal = async(ctx,next)=>{
	try{
		await next()
	}catch(err){
		const isresult = err instanceof result
		if(isresult){
			console.log('已知错误')
			ctx.body={
				msg:err.msg
			}
			ctx.status = err.code
		}else{
			console.log('未知错误')
			console.log(err)
			if(err.field){
				ctx.body = {
					msg:'图片参数不正确'
				}
				ctx.status = 400
				return false
			}
			ctx.body={
				msg:'服务器发生错误'
			}
			ctx.status = 500
		}
	}
}

module.exports =abnormal