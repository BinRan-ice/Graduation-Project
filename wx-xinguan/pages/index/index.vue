<template>
	<view class="content">
		<!-- 背景 -->
		<view class="content-img">
			<image src="/static/pageimg.png" mode="widthFix"></image>
		</view>
		<!-- 分享 -->
		<view class="wx-share" @click="shareFun()">分享</view>
		<!-- 数据来源 -->
		<view class="source">
			数据来源：辽宁省卫健委
		</view>
		<!-- 白色区域部分 -->
		<view class="content-main">
			<!-- 统计时间 -->
			<view class="times">统计截至 {{statimes}}</view>
			<!-- 累积数量 -->
			<view class="content-main-data">
				<block v-for="(item,index) in datas" :key="index">
				<view>
					<text>{{item.data}}</text>
					<text>{{item.diagnose}}</text>
				</view>
				</block>
			</view>
			<!-- 菜单 -->
			<view class="content-menu">
				<block v-for="(item,index) in menu" :key="index">
				<view class="content-menu-table" @click="bTns(item.url)">
					<view>
						<image :src="item.img" mode="widthFix"></image>
					</view>
					<view class="content-menu-text">
						<text>{{item.text}}</text>
						<text>{{item.label}}</text>
					</view>
				</view>
				</block>
			</view>
			<!-- 地图 -->
			<MAP :mapdata="mapdata"></MAP>
			<!--折线图-->
			<Line :linechartdata="linechartdata"></Line>
			<!--表格-->
			<Table :tabledata="tabledata"></Table>
		</view>	
	</view>
</template>

<script>
	//操作数据库的类
	let Dbadd = require('../../config/dbbase.js')
	//计算确诊，治愈，死亡：每一个总和的类
	let Thesum = require('../../config/thesum.js')
	//计算最晚时间
	import {timeDay} from '../../config/timeday.js'
	let {log} = console
	// 地图组件
	import 	MAP from './components/map.vue'
	//折线图组件
	import Line from './components/brokenline.vue'
	//表格
	import Table from './components/table.vue'
	export default {
		components:{MAP,Line,Table},
		data() {
			return {
				//统计截止日期
				statimes:'',
				//地图
				mapdata:[],
				//折线图
				linechartdata:[],
				//表格
				tabledata:[],
				datas:[
					{
						'data':0,
						'diagnose':'累积确诊'
					},
					{
						'data':0,
						'diagnose':'累积治愈'
					},
					{
						'data':0,
						'diagnose':'累积死亡'
					}
				],
				//菜单
				menu:[
					{
						'img':'../../static/jiankang.png',
						'text':'健康信息',
						'label':'上报健康信息',
						'url':'../report/report'
					},
					{
						'img':'../../static/xinwen.png',
						'text':'疫情新闻',
						'label':'热点早知道',
						'url':'../news/news'
					},
					{
						'img':'../../static/yaoyan.png',
						'text':'粉碎谣言',
						'label':'假消息不能信',
						'url':'../news/news'
					},
					{
						'img':'../../static/fugong.png',
						'text':'复工复产',
						'label':'复工出行助你安全',
						'url':'../news/news'
					}
				],
			}
		},
		methods: {
			//获取确诊，治愈，死亡三个集合的数据
			xinguanData(){
				let arr = [
					new Dbadd('diagnosis').pullGet(),
					new Dbadd('curedata').pullGet(),
					new Dbadd('deathdata').pullGet()
				]
				//promise.all可以同时请求多个集合
				Promise.all(arr)
				.then(res=>{
					log('三个集合的数据：')
					log(res)
					let diagdata = res[0].data
					let curedata = res[1].data
					let deathdata = res[2].data
					// -----------计算累计确诊，治愈，死亡------------
					this.covidTotal(diagdata,curedata,deathdata)
					// -----------地图的数据------------
					this.mapdata = diagdata
					// -----------折线图的数据------------
					this.linechartdata = res
					// -----------表格的数据------------
					this.tabledata = res
				})
				.catch(err=>{
					log(err)
				})
			},
			
			//计算累计确诊，治愈，死亡
			async covidTotal(diagdata,curedata,deathdata){
				//累计确诊
				let diag = await new Thesum(diagdata).Total()
				this.$set(this.datas[0],'data',diag.numdata)
				//累计确诊时间
				let timediag = diag.statime
				//累计治愈
				let cure = await new Thesum(curedata).Total()
				this.$set(this.datas[1],'data',cure.numdata)
				//累计治愈时间
				let timecure = cure.statime
				//累计死亡
				let death = await new Thesum(deathdata).Total()
				this.$set(this.datas[2],'data',death.numdata)
				//累计死亡时间
				let timedeath = death.statime
				//拆分合并为一个新数组
				let arrtimes = [...timediag,...timecure,...timedeath]
				//计算数据提交的最晚时间
				this.statimes = timeDay(arrtimes)
			},
			
			// 页面跳转
			bTns(url){
				wx.navigateTo({
					url:url
				})
			},
			// 分享
			shareFun(){
				let obj = {
					statimes:this.statimes,
					dia:this.datas[0].data,
					cure:this.datas[1].data,
					death:this.datas[2].data,
				}
				let srtobj = JSON.stringify(obj)
				wx.navigateTo({
					url:'../canvasview/canvas?obj=' + srtobj
				})
			}
		},
		created() {
			this.xinguanData()
		}
	}
</script>

<style scoped>
	.content{position: relative;}
	.content-img{width: 750upx; height: 450upx; background: #4CD964;
	overflow: hidden;}
	.content-img image{width: 750upx;}
	/* 分享 */
	.wx-share{position: absolute; top: 250upx; right: 0;
	color: #000000;
	font-size: 25upx;
	background: #00ff80;
	width: 100upx;
	height: 50upx;
	line-height: 50upx;
	text-align: center;
	border-top-left-radius: 25upx;
	border-bottom-left-radius: 25upx;}
	/* 来源 */
	.source{position: absolute; top: 340upx; right: 0;
	color: #FFFFFF;
	font-size: 25upx;
	padding-right: 10upx;}
	.content-main{position: absolute; top: 400upx; left: 0; right: 0;
	padding: 20upx 10upx; background: #FFFFFF;
	border-top-left-radius: 30upx; border-top-right-radius: 30upx;
	margin-bottom: 100upx;}
	.times{font-size: 25upx; height: 50upx;}
	.content-main-data{
	background: #f8f8f8;
	border-radius: 10upx;
	height: 150upx;
	display: flex; justify-content: space-around;
	align-items: center;}
	.content-main-data text{display: block; text-align: center;}
	.content-main-data text:nth-child(1){color: #cc1e1f; font-size: 40upx;
	font-weight: bold;}
	.content-main-data text:nth-child(2){color: #b5b5b5; font-size: 25upx;
	padding: 10upx 0;}
	/* .content-main-data text:nth-child(3){color: #b5b5b5; font-size: 20upx;} */
	/* 菜单 */
	.content-menu{background: #f8f8f8;
	border-radius: 10upx;
	padding-left: 10upx;
	margin-top: 20upx;
	height: 200upx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;}
	.content-menu-table text{display: block;}
	.content-menu-table image{width: 60upx; height: 60upx; padding-right: 15upx;}
	.content-menu-table{display: flex; align-items: center; width: 50%;}
	.content-menu-text text:nth-child(1){font-size: 30upx;}
	.content-menu-text text:nth-child(2){font-size: 25upx; color: #9a9a9a;}
</style>
