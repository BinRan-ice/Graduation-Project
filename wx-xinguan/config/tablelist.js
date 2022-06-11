// 表格的数据
var {log} = console
class Tablelist{
	// objlist：当天的新增确诊
	// numb：城市的数组下标
	// diagnosis:确诊
	// cureing：治愈
	// newdeath:死亡
	// city:城市
	constructor(objlist,numb,diagnosis,cureing,newdeath,city) {
	    this.objlist = objlist
		this.numb = numb
		this.diagnosis = diagnosis
		this.cureing = cureing
		this.newdeath = newdeath
		this.city = city
	}
	
	tableIng(){
		return new Promise((resolve,reject)=>{
			// --------当天的新增确诊求和---------
			let newlying = []
			this.objlist.forEach((item)=>{
				newlying.push(item[this.numb])
			})
			// log(newlying)
			let newlydata = 0
			newlying.forEach((item)=>{
				 newlydata += item
			})
			// log(newlydata)
			// --------累积确诊求和---------
			let accumulate = this.diagnosis.map((item)=>{
				let arrlist = []
				for(let key in item.diadata){
					arrlist.push(item.diadata[key])
				}
				return arrlist
			})
			// log(accumulate)
			let mulateing = []
			accumulate.forEach((item)=>{
				mulateing.push(item[this.numb])
			})
			let mulatedata = 0
			mulateing.forEach((item)=>{
				mulatedata += item
			})
			// log(mulatedata)
			// --------治愈求和---------
			let cumulativecure = this.cureing.map((item)=>{
				let arrlist = []
				for(let key in item.diadata){
					arrlist.push(item.diadata[key])
				}
				return arrlist
			})
			
			let cumulativeing = []
			cumulativecure.forEach((item)=>{
				cumulativeing.push(item[this.numb])
			})
			let cumulativedata = 0
			cumulativeing.forEach((item)=>{
				cumulativedata += item
			})
			// log(cumulativedata)
			// --------死亡求和---------
			let cumulativedeath = this.newdeath.map((item)=>{
				let arrlist = []
				for(let key in item.diadata){
					arrlist.push(item.diadata[key])
				}
				return arrlist
			})
			
			let cudeath = []
			cumulativedeath.forEach((item)=>{
				cudeath.push(item[this.numb])
			})
			let cudeathdata = 0
			cudeath.forEach((item)=>{
				cudeathdata += item
			})
			//------------组成一个对象返回去
			let tableobj = {
				'address':this.city,
				'newly':newlydata,
				'accumulate':mulatedata,
				'cure':cumulativedata,
				'death':cudeathdata
			}
			resolve(tableobj)
			
		})
	}
}

module.exports = Tablelist