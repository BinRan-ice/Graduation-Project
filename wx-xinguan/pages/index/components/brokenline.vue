<template>
	<view class="Dizhou-cont">
		<view class="Dizhou">辽宁疫情新增趋势</view>
		<!-- 折线图 -->
		<view class="myCharts">
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"  @touchend="touchEndLineA"></canvas>
		</view>
	</view>
</template>

<script>
	var {log} = console
	import uCharts from '@/components/u-charts/u-charts.js';
	let moment = require('moment')
	moment.locale('zh-cn')
	//折线图的类
	let Linechart = require('../../../config/Linechart.js')
	// 折线图的数据
	let linedata = require('config/line.json')
	//折线图的动态js数据
	import {newLine} from '../../../config/newline.js'
	var canvaLineA=null;
	var lastMoveTime=null;//最后执行移动的时间戳
	export default{
		props:{linechartdata:Array},
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				//动态日期
				catedays:[],
				//新增确诊每一天总和的数组
				samedaydia:[],
				//新增治愈每一天总和的数组
				samedaycure:[],
				//新增死亡每一天总和的数组
				samedaydeath:[]
			}
		},
		
		created() {
			
		},
		
		methods:{
			getServerData(vbclin){
				//let linDatas = linedata.data.LineA.chartData
				let LineA={categories:[],series:[]};
				LineA.categories=vbclin.categories;
				LineA.series=vbclin.series;
				//第二根线为虚线的设置
				LineA.series[1].lineType='dash';
				LineA.series[1].dashLength=10;
				this.showLineA("canvasLineA",LineA);
		    },
			
			showLineA(canvasId,chartData){
				canvaLineA=new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'line',
					colors:['#facc14', '#f04864', '#8543e0'],
					fontSize:11,
					padding:[15,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:0,
					},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:this.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:2,
						axisLine:false,
						//disableGrid:true
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:2,
					},
					width: this.cWidth*this.pixelRatio,
					height: this.cHeight*this.pixelRatio,
					extra: {
						line:{
							type: 'straight',
						}
					}
				});
				//下面是默认选中索引
				let cindex=5;
				//下面是自定义文案
				let textList=[
						{text:`${this.catedays[5]}: 新增确诊${this.samedaydia[5]}`,color:'#facc14'},
						{text:`${this.catedays[5]}: 新增治愈${this.samedaycure[5]}`,color:'#f04864'},
						{text:`${this.catedays[5]}: 新增死亡${this.samedaydeath[5]}`,color:'#8543e0'}
					];
				//下面是event的模拟,tooltip的Y坐标值通过这个mp.changedTouches[0].y控制
				let tmpevent={mp:{changedTouches:[{identifier: 0, x: 366.5, y: 148.5}]}};
				setTimeout(()=>{
					canvaLineA.showToolTip( tmpevent , {
						index:cindex,
						textList:textList
					});
				},200)
			},
			
			touchLineA(e) {
							lastMoveTime=Date.now();
						},
			
			touchEndLineA(e){
							// log(e)
							canvaLineA.touchLegend(e);
							canvaLineA.showToolTip(e, {
								format: function (item, category) {
									return category + ' ' + item.name + ':' + item.data 
								}
							});
						},
		},
		
		watch:{
			async linechartdata(newvalue,oldvalue){
				log('折线图数据：')
				log(newvalue)
				//折线图有两组动态数据：1.日期（前五天含今天），2.确诊，治愈，死亡
				//1.日期（前五天含今天共六天）
				let arr = [5,4,3,2,1,0]
				this.catedays = arr.map((item)=>{
					return moment().subtract(item,'days').format('MM-DD')
				})
				log(this.catedays)
				//新增确诊人数
				this.samedaydia = await new Linechart(this.catedays,newvalue[0].data).lineChartdata()
				log(this.samedaydia)
				//新增治愈人数
				this.samedaycure = await new Linechart(this.catedays,newvalue[1].data).lineChartdata()
				log(this.samedaycure)
				//新增死亡人数
				this.samedaydeath = await new Linechart(this.catedays,newvalue[2].data).lineChartdata()
				log(this.samedaydeath)
				let vbclin = newLine(this.catedays,this.samedaydia,this.samedaycure,this.samedaydeath)
				this.cWidth=uni.upx2px(750)
				this.cHeight=uni.upx2px(500)
				this.getServerData(vbclin)
			}
		}
	}
	
</script>

<style scoped>
	.myCharts{width: 700upx; height: 500upx;}
		.charts{width: 700upx; height: 500upx;}
		.Dizhou-cont {
			margin: 20upx 0;
		}
		.Dizhou {
			font-size: 30upx;
			font-weight: bold;
		}
</style>
