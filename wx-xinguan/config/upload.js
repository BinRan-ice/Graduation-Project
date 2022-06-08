// 处理上传图片
class Upload{
	constructor(arg='1') {
	    this.arg = arg
	}
	
	// 上传本地相册的图片
	upLoadimg(){
		return new Promise((resolve,reject)=>{
			wx.chooseImage({
			  count: 1,
			  sizeType: ['compressed'],
			  sourceType: ['album', 'camera'],
			  success (res) {
				resolve(res.tempFilePaths[0])
			  },
			  fail:(err)=>{
				  reject(err)
			  }
			})
		})
	}
	
	// 上传图片到云储存
	collEctimg(img){
		return new Promise((resolve,reject)=>{
			// 为防止同名文件产生，需更改图片命名
			const imgion = img.lastIndexOf('.')
			const eximg = img.slice(imgion)
			// 时间戳，随机数
			const cloudpath = `${Date.now()}-${Math.floor(Math.random(0,1)*10000000)}${eximg}`
			wx.cloud.uploadFile({
			  cloudPath: 'idcard/' + cloudpath,
			  filePath: img, // 文件路径
			}).then(res => {
			  resolve(res.fileID)
			}).catch(error => {
			  reject(error)
			})
		})
	}
	
	// 换取htpps的图片地址
	httpImg(fid){
		return new Promise((resolve,reject)=>{
			wx.cloud.getTempFileURL({
			  fileList: [{
			    fileID: fid
			  }]
			}).then(res => {
			  resolve(res.fileList[0].tempFileURL)
			}).catch(error => {
				reject(error)
			})
		})
	}
	
	// 调用身份证识别的云函数
	aiClound(cloundimg){
		return new Promise((resolve,reject)=>{
			wx.cloud.callFunction({
			  // 要调用的云函数名称
			  name: 'xinguan-idcard',
			  // 传递给云函数的event参数
			  data: {cardimg:cloundimg}
			}).then(res => {
			  resolve(res)
			}).catch(err => {
			  reject(err)
			})
		})
	}	
}

module.exports = Upload