// 公用的上传图片
const multer = require('koa-multer');
let OSS = require('ali-oss');

let client = new OSS({
  region: 'oss-cn-beijing',
  //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
  accessKeyId: '',
  accessKeySecret: '',
  bucket: '',
});


// 解析前端提交上来的file对象的图片
let storage = multer.diskStorage({
	// 图片存储路径
	destination:(req,file,cb)=>{
		cb(null,'public/uploads')
	},
	// 防止同名文件产生
	filename:(req,file,cb)=>{
		let fileFormat = (file.originalname).split('.')
		cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1])
	}
})

// 配置
let upload = multer({storage})
const {log}=console


// oss上传图片
let uploadimg = function(image){
	return new Promise((resolve,reject)=>{
		client.put('xinguanoss/' + image,image)
		.then(res=>{
			resolve(res.url)
		})
		.catch(err=>{
			reject(err)
		})
	})
}

module.exports = {upload,uploadimg}