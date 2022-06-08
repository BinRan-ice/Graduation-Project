// 身份证正则
var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
// 手机号码
var ipho = /^1[3456789]\d{9}$/

let check = function(obj){
	let{
		names,
		iphone,
		IDcard,
		Gender,
		date,
		city,
		province,
		address,
		lodge,
		sympom,
		agree
	} = obj
	return new Promise((resolve,reject)=>{
		// 姓名
		if(names == ''){
			let tip = '请填写姓名'
			resolve(tip)
			return false
		}
		// 手机号码
		if(!ipho.test(iphone)){
			let tip = '请填写正确的手机号码'
			resolve(tip)
			return false
		}
		// 身份证
		if(!idcardReg.test(IDcard)){
			let tip = '请填写正确的身份证号码'
			resolve(tip)
			return false
		}
		// 性别
		if(Gender == ''){
			let tip = '请选择性别'
			resolve(tip)
			return false
		}
		// 出生日期
		if(date == ''){
			let tip = '请选择出生日期'
			resolve(tip)
			return false
		}
		// 户籍
		if(city == ''){
			let tip = '请选择户籍所在地'
			resolve(tip)
			return false
		}
		// 居住省市
		if(province == ''){
			let tip = '请选择居住省市'
			resolve(tip)
			return false
		}
		// 详细地址
		if(address == ''){
			let tip = '请填写详细地址'
			resolve(tip)
			return false
		}
		// 是否常住辽宁
		if(lodge == ''){
			let tip = '请选择是否常住辽宁'
			resolve(tip)
			return false
		}
		// 是否出现症状
		if(sympom.length == 0){
			let tip = '请选择是否出现症状'
			resolve(tip)
			return false
		}
		// 勾选，同意
		if(agree.length == 0){
			let tip = '请勾选本申报所列事项'
			resolve(tip)
			return false
		}
		// 全部通过
		let tip = 'SUCCESS'
		resolve(tip)
		
	})
}

export {check}