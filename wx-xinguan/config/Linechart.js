// 折线图的疫情数据
let moment = require('moment')
moment.locale('zh-cn')
let {log}  =console
class Linechart{
	// catedays:日期
	// newdiag:确诊 || 治愈 || 死亡
	constructor(catedays,newdiag) {
	    this.catedays = catedays
		this.newdiag = newdiag
	}
	
	lineChartdata(){
		return new Promise((resolve,reject)=>{
			// 根据日期筛选当天的新增确诊 || 治愈 || 死亡 的数据
			let mapdays = this.catedays.map((itemday)=>{
				let screendays = this.newdiag.filter((item)=>{
					return moment(item.time).format('MM-DD') == itemday
				})
				return screendays
			})
			// log('筛选的数据')
			// log(mapdays)
			// 遍历6次，取当天的确诊 || 治愈 || 死亡 ：总和
			let maparr = [0,1,2,3,4,5]
			let maplist = maparr.map((itemarr)=>{
				// 遍历取到diadata的值
				let disgarr = mapdays[itemarr].map((item)=>{
					return item.diadata
				})
				// 找到vaule值
				let arrlist = []
				disgarr.forEach((item)=>{
					for(let key in item){
						arrlist.push(item[key])
					}
				})
				//  计算确诊 || 治愈 || 死亡 ：总和
				let numdata = 0
				arrlist.forEach((item)=>{
					numdata += item
				})
				return numdata
			})
			resolve(maplist)
		})
	}
}

module.exports = Linechart