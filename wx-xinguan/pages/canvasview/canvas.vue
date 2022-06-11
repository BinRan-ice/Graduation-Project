<template>
	<view>
		<!-- 画布 -->
		<view class="canvas-view" :class="[hideing === 0 ? 'actinclass' : 'errorclass']">
			<canvas style="width: 300px; height: 520px;" canvas-id="firstCanvas"></canvas>
		</view>
		<!-- 保存按钮 -->
		<view class="preview">
			<button plain="true" hover-class="none" @click="kEep()">保存图片</button>
		</view>
		<!-- 提示 -->
		<view class="loading-view" v-if="loading">
			<view class="loadin-flex">
				<view>正在为你请求最新数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return { 
				// 提示
				loading:true,
				hideing:0,
				// 绘制的临时图片链接
				keepimg:''
			}
		},
		
		onLoad(e) {
			console.log(JSON.parse(e.obj))
			let obj = JSON.parse(e.obj)
			this.canVas(obj)
		},
		
		methods:{
			async canVas(obj){
				// 1.创建canvas上下文
				var context = wx.createCanvasContext('firstCanvas')
				// 2.绘制一个背景图片
				await this.backImg(context)
				// 3.绘制标题文本
				await this.tiTle(context)
				// 4.绘制白色背景
				await this.whiteBack(context)
				// 5.统计截至日期
				await this.cenSus(context,obj.statimes)
				// 6.确诊，治愈，死亡
				await this.peoPle(context,obj)
				// 7.地图
				await this.mapImg(context)
				// 8.二维码
				await this.codEs(context)
				// draw()：绘制到画布
				context.draw(true,setTimeout(()=>{
					this.showImg()
				},1500))
			},
			
			// 绘制背景图片
			backImg(context){
				return new Promise((resolve,reject)=>{
					context.drawImage('/static/canvas/yiqingbeijing.jpg', 0, 0, 300, 520)
					resolve('SUCCESS')
				})
			},
			// 绘制标题文本
			tiTle(context){
				return new Promise((resolve,reject)=>{
					let str = '辽宁疫情实时播报'
					context.setFillStyle('rgb(255,255,255)')//颜色
					context.setFontSize('20')
					context.fillText(str, (300 - context.measureText(str).width) / 2, 50)
					resolve('SUCCESS')
				})
			},
			// 绘制白色背景
			whiteBack(context){
				return new Promise((resolve,reject)=>{
					context.rect(25, 80, 250, 320)
					context.setFillStyle('#FFFFFF')
					context.fill()
					resolve('SUCCESS')
				})
			},
			// 统计截至日期
			cenSus(context,statimes){
				return new Promise((resolve,reject)=>{
					let string = `统计截止: ${statimes}`
					context.setFillStyle('rgb(102,0,0)')//颜色
					context.setFontSize('12')
					context.fillText(string, 30, 100)
					resolve('SUCCESS')
				})
			},
			// 确诊，治愈，死亡
			peoPle(context,obj){
				return new Promise((resolve,reject)=>{
				let dianum = obj.dia
				let diatext = '累积确诊'
				let curenum = obj.cure
				let curetext = '累积治愈'
				let deathnum = obj.death
				let deathtext = '累积死亡'
				context.setFillStyle('rgb(255,140,26)')//颜色
				context.setFontSize('14')
				// 纯文本
				context.fillText(diatext, 30, 160)
				context.fillText(curetext, 122, 160)
				context.fillText(deathtext, 214, 160)
				// 数字
				let diawidth = context.measureText(diatext).width//56
				let diamunwidth = context.measureText(dianum).width
				let curenumwidth = context.measureText(curenum).width
				let deathnumwidth = context.measureText(deathnum).width
				console.log(diamunwidth + '-' + curenumwidth + '-' + deathnumwidth)
				// 确定数字位置
				context.fillText(dianum, (diawidth-diamunwidth)/2+30, 140)
				context.fillText(curenum, (diawidth-curenumwidth)/2+122, 140)
				context.fillText(deathnum, (diawidth-deathnumwidth)/2+214, 140)
				resolve('SUCCESS')
				})
			},
			// 地图
			mapImg(context){
				return new Promise((resolve,reject)=>{
					context.drawImage('/static/canvas/mapimg.jpg', 25, 170, 250, 250)
					resolve('SUCCESS')
				})
			},
			//二维码
			codEs(context){
				return new Promise((resolve,reject)=>{
					context.drawImage('/static/canvas/codes.jpg', 25, 450, 50, 50)
					let str = '扫码第一时间获取辽宁疫情最新动态'
					context.setFillStyle('rgb(255,255,255)')//颜色
					context.setFontSize('12')
					context.fillText(str, 80, 480)
					resolve('SUCCESS')
				})
			},
			
			// 导出canvas画布生成的图片
			showImg(){
				wx.canvasToTempFilePath({
				  canvasId: 'firstCanvas',
				  success:(res)=> {
				    console.log(res)
					this.keepimg = res.tempFilePath
					this.hideing = 1
					this.loading = false
				  },
				  fail: (err) => {
				  	console.log('绘制失败')
				  }
				})
			},
			
			// 保存图片
			kEep(){
				console.log(this.keepimg)
				wx.saveImageToPhotosAlbum({
				  filePath:this.keepimg,
				  success:(res)=> {
					  console.log('保存成功')
					  wx.showToast({
						  title:'保存成功',
						  icon:'none',
						  duration:1500
					  })
				  },
				  fail: (err) => { 
				  	console.log('保存失败')
					wx.showModal({
						content:'点击右上角设置里允许保存',
						showCancel:false,
						confirmText:'我知道了',
						success:(res)=>{
							console.log('ok')
						}
					})
				  }
				})
			}
			
		}
	}
</script>

<style>
	page{background: #f6f6f6;}
	.canvas-view{width: 300px; height: 520px; margin: 20rpx auto 0 auto;}
	.preview button{
		border: none !important;
		color: #FFFFFF;
		font-size: 30upx;
		background: #0036d6;
		width: 300upx;
		height: 70upx;
		line-height: 70upx;
	}
	.preview{display: flex; justify-content: space-between;
	padding-top: 20upx;}
	/* 提示 */
	.loading-view{position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 9999;
	overflow: hidden;
	background: #f5f5f5;}
	.loadin-flex{display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	font-size: 26upx;}
	/* cavas*/
	.actinclass{position: fixed;
	left: -1000px;
	top:0;}
	.errorclass{display: block;}
</style>
