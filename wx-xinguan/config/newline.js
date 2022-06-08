// 折线图
let newLine = function(catedays,samedaydia,samedaycure,samedaydeath){
	let chartData = {
		"categories": catedays,
		"series": [{
			"name": "新增确诊",
			"data": samedaydia
		}, {
			"name": "新增治愈",
			"data": samedaycure
		}, {
			"name": "新增死亡",
			"data": samedaydeath
		}]
	}
	return chartData
}

export {newLine}