<template>
	<view class="Dizhou-cont">
		<view class="Dizhou">各市确诊数</view>
		<!-- 地图 -->
		<view class="myCharts">
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchMap"></canvas>
		</view>
	</view>
</template>


<script>
	var {log} = console
	import uCharts from '@/components/u-charts/u-charts.js';
	// 引入辽宁的地图
	let liaoning = require('config/liaoning.json')
	//辽宁地图的js文件
	import {arrRess} from '../../../config/liaoningadd.js'
	var canvaMap=null;
	export default{
		props:{
			mapdata:Array
		},
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				//接收所有城市确诊数的对象
				regiondata:{},
				//赋值的动态地图数据
				mapdatas:[]
			}
		},
		
		
		created() {
			
		},	
			
			
		methods:{
			getServerData(mapdatas){
				/* log(liaoning)
				let cMap = liaoning.features */
				this.showMap("canvasPie",mapdatas)
			},
			showMap(canvasId,chartData){
				canvaMap=new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'map',
					fontSize:9,
					padding:[10,10,10,10],
					legend:{
						show:false,
						position:'left',
						padding:2,
						itemGap:2,
						margin:1
					},
					background:'#FFFFFF',
					pixelRatio:this.pixelRatio,
					series: chartData,
					dataLabel:true,
					width: this.cWidth*this.pixelRatio,
					height: this.cHeight*this.pixelRatio,
					extra: {
						map: {
						border:true,
						borderWidth:1,
						borderColor:'#666666',
						fillOpacity:0.6
						}
					}
				});	
				//下面是默认选中索引
				let cindex=0;
				//下面是自定义文案
				let textList=[{text:`沈阳市: 确诊${this.regiondata.Shenyang}`,color:'#facc14'}];
				//下面是event的模拟,tooltip的Y坐标值通过这个mp.changedTouches[0].y控制
				let tmpevent={mp:{changedTouches:[{identifier: 0, x: 218.49999618530273, y: 141.55001831054688}]}};
				setTimeout(()=>{ 
					canvaMap.showToolTip( tmpevent , {
						index:cindex,
						textList:textList
					});
				},200)
			},	
			
			// 事件
			touchMap(e){
				//log(e)
				canvaMap.showToolTip(e, {
					format:  (item)=> {
						return item.properties.name + ': 确诊' + item.properties.subFeatureIndex
					}
				});
			},
		},
		
		watch:{
			mapdata(newvalue,oldvalue){
				log('地图，确诊数：')
				log(newvalue)
				//沈阳
				let numsy = 0
				newvalue.forEach((item)=>{
					numsy += item.diadata.Shenyangdig
				})
				this.regiondata['Shenyang'] = numsy
				//大连
				let numdl = 0
				newvalue.forEach((item)=>{
					numdl += item.diadata.Daliandig
				})
				this.regiondata['Dalian'] = numdl
				//鞍山
				let numas = 0
				newvalue.forEach((item)=>{
					numas += item.diadata.Anshandig
				})
				this.regiondata['Anshan'] = numas
				//营口
				let numyk = 0
				newvalue.forEach((item)=>{
					numyk += item.diadata.Yingkoudig
				})
				this.regiondata['Yingkou'] = numyk
				//辽阳
				let numly = 0
				newvalue.forEach((item)=>{
					numly += item.diadata.Liaoyangdig
				})
				this.regiondata['Liaoyang'] = numly
				//本溪
				let numbx = 0
				newvalue.forEach((item)=>{
					numbx += item.diadata.Benxidig
				})
				this.regiondata['Benxi'] = numbx
				//丹东
				let numdd = 0
				newvalue.forEach((item)=>{
					numdd += item.diadata.Dandongdig
				})
				this.regiondata['Dandong'] = numdd
				//抚顺
				let numfs = 0
				newvalue.forEach((item)=>{
					numfs += item.diadata.Fushundig
				})
				this.regiondata['Fushun'] = numfs
				//铁岭
				let numtl = 0
				newvalue.forEach((item)=>{
					numtl += item.diadata.Tielingdig
				})
				this.regiondata['Tieling'] = numtl
				//盘锦
				let numpj = 0
				newvalue.forEach((item)=>{
					numpj += item.diadata.Panjindig
				})
				this.regiondata['Panjindig'] = numpj
				//锦州
				let numjz = 0
				newvalue.forEach((item)=>{
					numjz += item.diadata.Jinzhoudig
				})
				this.regiondata['Jinzhou'] = numjz
				//阜新
				let numfx = 0
				newvalue.forEach((item)=>{
					numfx += item.diadata.Fuxindig
				})
				this.regiondata['Fuxin'] = numfx
				//朝阳
				let numcy = 0
				newvalue.forEach((item)=>{
					numcy += item.diadata.Chaoyangdig
				})
				this.regiondata['Chaoyang'] = numcy
				//葫芦岛
				let numhld = 0
				newvalue.forEach((item)=>{
					numhld += item.diadata.Huludaodig
				})
				this.regiondata['Huludao'] = numhld
				log(this.regiondata)
				this.mapdatas = arrRess(this.regiondata)
				this.cWidth=uni.upx2px(650)
				this.cHeight=uni.upx2px(700)
				this.getServerData(this.mapdatas)
			}
		}	
	} 
</script>


<style scoped>
	/* 可视化表格 */
	.myCharts{width: 650upx;height: 700upx;
	/* margin-top: 20upx; */
	margin: auto;
	overflow: hidden;
	}
	.charts{width: 650upx; height: 700upx;}
	.Dizhou-cont{margin: 20upx 0;}
	.Dizhou{font-size: 30upx; font-weight: bold;}
</style>