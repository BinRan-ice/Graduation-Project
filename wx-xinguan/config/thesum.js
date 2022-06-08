//计算确诊，治愈，死亡：每一个总和
let {log} = console
class Thesum{
	constructor(numberof) {
	    this.numberof = numberof
	}
	
	Total(){
		return new Promise((resolve,reject)=>{
			//抽出diadata和时间重组一个数组
			let disgarr = this.numberof.map((item)=>{
				let data = item.diadata
				let times = item.time
				return {data,times}
			})
			//取出value值
			let arrlist = []
			disgarr.forEach((item)=>{
				for(let key in item.data){
					arrlist.push(item.data[key])
				}
			})
			//计算arrlist里的数字总和
			let numdata = 0
			arrlist.forEach((item)=>{
				numdata+=item
			})
			//取出上传时间
			let statime = disgarr.map((item)=>{
				let times = item.times
				return times
			})
			let result = {statime,numdata}
			resolve(result)
		})
	}
}

module.exports = Thesum