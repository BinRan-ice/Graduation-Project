//计算最晚时间
let moment = require('moment')
moment.locale('zh-cn')

let timeDay = function(arrtimes){
	let dayarr = arrtimes.map((item)=>{
		return new Date(item).getTime()
	})
	let iMin = Math.max(...dayarr)
	let day = moment(iMin).format('YYYY-MM-DD HH:mm:ss')
	return day
}

export {timeDay}