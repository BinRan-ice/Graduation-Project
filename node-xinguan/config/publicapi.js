const request = require('request') 
const qs = require('querystring')

//body响应
const initdata = require('./init.js')
const result = require('./resultdata.js')

//拼接url地址
const param = qs.stringify({
	 grant_type:'client_credential',
	 appid:'wx3a4feb97b5fde6b9',
	 secret:'8b11feed6581e4dfd136472d58c75d14'
})

//获取token地址
let url ='https://api.weixin.qq.com/cgi-bin/token?'+ param

//云环境ID
let env = 'binran-ice-3ggwdvsp7a4dc70e'

//数据库插入记录url
let Addurl = 'https://api.weixin.qq.com/tcb/databaseadd?access_token='

// 数据库查询记录url
let Tripurl = 'https://api.weixin.qq.com/tcb/databasequery?access_token='

class Gettoken{
	constructor(ctx) {
	    this.ctx=ctx
	}
	
	//获取token
	getToken(){
		return new Promise((resolve,reject)=>{
			request(url,(error,response,body)=>{
				if(!error && response.statusCode == 200){
					resolve(JSON.parse(body).access_token)
				}else{
					reject(error)
				}
			})
		})
	}
	
	//公用的promise post请求
	pullDatabase(url,data){
		return new Promise((resolve,reject)=>{
			request({
				url:url,
				method:'POST',
				json:true,
				header:{
					"content-Type":"application/json"
				},
				body:data
			},(error,response,body)=>{
				if(!error && response.statusCode ==200){
					if(body.errmsg == 'ok'){
						resolve(response.body)
					}else{
						reject(body)
					}
				}else{
					reject(error)
				}
			})
		})
	}
}

//插入记录
class Databaseadd extends Gettoken{
	constructor(ctx) {
	    super(ctx)
	}
	
	async dataBaseadd(query){
		try{
			let token= await this.getToken()
			var url = Addurl + token	//此处使用let，url作用域只在try catch中生效，后面拿不到url数据
		}catch(e){
			throw new result('获取Token出现错误',500)
		}
		let data ={
			env,
			"query":query
		}
		try{
			let vbn = await this.pullDatabase(url,data)
			new initdata(this.ctx).listing()
		}catch(e){
			new initdata(this.ctx),tips('FAIL',500)
		}
	}
}

// get请求,查询数据库
class Databasequery extends Gettoken{
	constructor(ctx) {
	    super(ctx)
	}
	
	async dataBasequery(query,libi){
		try{
			let token = await this.getToken()
			var url = Tripurl + token
		}catch(e){
			throw new result('获取token出现错误',500)
		}
		let data = {
			env,
			"query":query
		}
		try{
			let querydata = await this.pullDatabase(url,data)
			let tripquery = querydata.data.map((item)=>{
				return JSON.parse(item)
			})
			if(libi == 'vp'){
				// 登录
				console.log('登录')
				console.log(tripquery)
				if(tripquery.length === 0){
					new initdata(this.ctx).tips('账号或密码错误',202)
				}else{
					new initdata(this.ctx,'SUCCESS',tripquery[0].token).listing()
				}
			}else{
				new initdata(this.ctx,'SUCCESS',tripquery).listing()
			}
		}catch(e){
			new initdata(this.ctx).tips('FAIL',500)
		}
	}
}

module.exports = {Databaseadd,Databasequery}
