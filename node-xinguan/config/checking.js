// 参数检验

// 空校验
// 数字类型校验
// undefined校验
// 空格校验
// 手机号码
// 密码
// 图片未上传校验
const result = require('./resultdata.js')

class checkings{
	constructor(ctx,body) {
		this.ctx = ctx
		this.obj = body
	}
	
	// 检验前端开发者参数错误，为underfind
	Errunder(){
		let bvc = this.obj.indexOf(undefined)
		if(bvc != -1){
			throw new result('参数填写错误',400)
		}
	}
	
	// 校验用户填写为空
	Parameter(list){
		let bvc = this.obj.indexOf('')
		if(bvc != -1){
			throw new result(list[bvc],202)
		}
	}
	
	// 校验空格符号
	Blank(list){
		let vbn = this.obj.filter(item=>{
			return item.split(" ").join("").length === 0
		})
		let bvc = this.obj.indexOf(vbn[0])
		if(bvc != -1){
			throw new result(list[bvc],202)
		}
	}
	
	// 校验图片未上传
	Checimg(){
		if(this.ctx.req.file === undefined){
			throw new result('请上传图片',202)
		}
	}
	
	// 校验参数为数字类型
	Checnumber(list){
		var numbering = this.obj
		let vbn = numbering.filter(item=>{
			return isNaN(item)
		})
		let bvc = numbering.indexOf(vbn[0])
		if(bvc != -1){
			throw new result(list[bvc],202)
		}
	}
	
	// 校验手机号码
	Phone(mobile){
		let phone = /^1[3456789]\d{9}$/
		if(!phone.test(this.obj[0])){
			throw new result(mobile,202)
		}
	}
	
	// 密码验证：6-20位数字和字母的组合
	Password(pass){
		let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
		if(!reg.test(this.obj[1])){
			throw new result(pass,202)
		}
	}
	
}

//确诊 || 治愈 || 死亡
class Deathing extends checkings{
	DeathingFun(tip){
		//空校验
		let arr = `[
			"请填写境外${tip}人数","请填写沈阳市${tip}人数",
			"请填写大连市${tip}人数","请填写鞍山市${tip}人数",
			"请填写营口市${tip}人数","请填写辽阳市${tip}人数",
			"请填写本溪市${tip}人数","请填写丹东市${tip}人数",
			"请填写抚顺市${tip}人数","请填写铁岭市${tip}人数",
			"请填写盘锦市${tip}人数","请填写锦州市${tip}人数",
			"请填写阜新市${tip}人数","请填写朝阳市${tip}人数",
			"请填写葫芦岛市${tip}人数"	
		]`
		let af = JSON.parse(arr)
		
		//数字校验
		let nums = `[
			"境外${tip}人数必须填写数字","沈阳市${tip}人数必须填写数字",
			"大连市${tip}人数必须填写数字","鞍山市${tip}人数必须填写数字",
			"营口市${tip}人数必须填写数字","辽阳市${tip}人数必须填写数字",
			"本溪市${tip}人数必须填写数字","丹东市${tip}人数必须填写数字",
			"抚顺市${tip}人数必须填写数字","铁岭市${tip}人数必须填写数字",
			"盘锦市${tip}人数必须填写数字","锦州市${tip}人数必须填写数字",
			"阜新市${tip}人数必须填写数字","朝阳市${tip}人数必须填写数字",
			"葫芦岛市${tip}人数必须填写数字"
		]`
		let ae = JSON.parse(nums)
		super.Errunder()
		super.Parameter(af)
		super.Blank(af)
		super.Checnumber(ae)
	}
}

// 文章的校验
class Richtext extends checkings{
	richtextFun(){
		let arr = ['请填写标题','请填写作者','请填写正文']
		super.Errunder()
		super.Parameter(arr)
		super.Blank(arr)
		super.Checimg()
	}
}

// 登录校验
class Login extends checkings{
	loginFun(){
		let arr = ['请填写手机号码','请填写密码']
		super.Errunder()
		super.Parameter(arr)
		super.Blank(arr)
		super.Phone('手机号码格式不正确')
	}
}

module.exports = {Deathing,Richtext,Login}