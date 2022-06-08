// 操作数据库的增删改查的类
const db = wx.cloud.database()

class Dbadd{
	constructor(collect,datas='db') {
	    this.collect = collect
		this.datas = datas
	}
	
	// get请求数据库
	pullGet(){
		return new Promise((resolve,reject)=>{
			const base = db.collection(this.collect)
			base.get()
			.then((res)=>{
				resolve(res)
			})
			.catch((err)=>{
				reject(err)
			})
		})
	}
	
	// add提交到集合
	pullAdd(){
		return new Promise((resolve,reject)=>{
			const base = db.collection(this.collect)
			base.add({
				data:this.datas
			})
			.then(res=>{
				resolve(res)
			})
			.catch(err=>{
				reject(err)
			})
		})
	}
	
	// where查询数据库集合
	pullWhere(obj){
		return new Promise((resolve,reject)=>{
			const base = db.collection(this.collect)
			base.where(obj).get()
			.then(res=>{
				resolve(res)
			})
			.catch(err=>{
				reject(err)
			})
		})
	}
}

module.exports = Dbadd