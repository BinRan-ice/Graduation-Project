// 公用提示
class Errdatas{
	constructor(msg='识别失败,请上传正确的身份证重试') {
	    this.msg = msg
	}
	
	errlist(){
		wx.showToast({
		  icon:'none',
		  title: this.msg,
		  duration: 2000
		})
	}
}

module.exports = Errdatas