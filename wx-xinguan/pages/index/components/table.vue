<template>
	<view>
		<view class="Dizhou-cont">
			<view class="Dizhou">辽宁疫情</view>
			<view class="tips">7:00-10:00为更新高峰，数据如有滞后请谅解</view>
			<!-- 表格 -->
			<view class="myCharts">
				<view class="table-cont">
					<block v-for="(item,index) in tables" :key="index">
					<text>{{item}}</text>
					</block>
				</view>
				<!-- 数据 -->
				<view>
					<block v-for="(item,index) in tabledatas" :key="index">
					<view class="table-datas">	
					<text>{{item.address}}</text>
					<text>{{item.newly}}</text>
					<text>{{item.accumulate}}</text>
					<text>{{item.cure}}</text>
					<text>{{item.death}}</text>
					</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let {log} = console
	//时间处理
	let moment = require('moment')
	moment.locale('zh-cn')
	//表格数据处理类
	let Tablelist = require('../../../config/tablelist.js')
	export default{
		props:{tabledata:Array},
		data() {
			return {
				tables:['地区','新增确诊','累计确诊','治愈','死亡'],
				tabledatas:[],
				datas:[
					{
						'address':'境外输入',
						'newly':2,
						'accumulate':5,
						'cure':30,
						'death':2
					}
				]
			}
		},
		
		watch:{
			async tabledata(newvalue,oldvalue){
				log('表格的数据：')
				log(newvalue)
				//确诊
				let newdig = newvalue[0].data
				//治愈
				let newcure = newvalue[1].data
				//死亡
				let newdeath = newvalue[2].data
				//最终需要的数据格式是数组对象的
				//1.当天时间获取
				let now = moment().format('YYYY-MM-DD')
				let timeday = []
				timeday.push(now)
				log(timeday)
				//2.取新增确诊（当天）
				let newdisgarr = timeday.map((iteming)=>{
					let tabledays = newdig.filter((item)=>{
						return moment(item.time).format('YYYY-MM-DD') == iteming
					})
					return tabledays
				})
				log(newdisgarr[0])
				//3.取新增确诊：value值
				let objlist = newdisgarr[0].map((item)=>{
					let arrlist = []
					for(let key in item.diadata){
						arrlist.push(item.diadata[key])
					}
					return arrlist
				})
				log(objlist)
				//境外输入
				let Abrod = await new Tablelist(objlist,0,newdig,newcure,newdeath,'境外输入').tableIng()
				this.tabledatas.push(Abrod)
				//沈阳
				let Shenyang = await new Tablelist(objlist,12,newdig,newcure,newdeath,'沈阳').tableIng()
				this.tabledatas.push(Shenyang)
				//大连
				let Dalian = await new Tablelist(objlist,4,newdig,newcure,newdeath,'大连').tableIng()
				this.tabledatas.push(Dalian)
				//鞍山
				let Anshan = await new Tablelist(objlist,1,newdig,newcure,newdeath,'鞍山').tableIng()
				this.tabledatas.push(Anshan)
				//营口
				let Yingkou = await new Tablelist(objlist,14,newdig,newcure,newdeath,'营口').tableIng()
				this.tabledatas.push(Yingkou)
				//辽阳
				let Liaoyang = await new Tablelist(objlist,10,newdig,newcure,newdeath,'辽阳').tableIng()
				this.tabledatas.push(Liaoyang)
				//本溪
				let Benxi = await new Tablelist(objlist,2,newdig,newcure,newdeath,'本溪').tableIng()
				this.tabledatas.push(Benxi)
				//丹东
				let Dandong = await new Tablelist(objlist,5,newdig,newcure,newdeath,'丹东').tableIng()
				this.tabledatas.push(Dandong)
				//抚顺
				let Fushun = await new Tablelist(objlist,6,newdig,newcure,newdeath,'抚顺').tableIng()
				this.tabledatas.push(Fushun)
				//铁岭
				let Tieling = await new Tablelist(objlist,13,newdig,newcure,newdeath,'铁岭').tableIng()
				this.tabledatas.push(Tieling)
				//盘锦
				let Panjin = await new Tablelist(objlist,11,newdig,newcure,newdeath,'盘锦').tableIng()
				this.tabledatas.push(Panjin)
				//锦州
				let Jinzhou = await new Tablelist(objlist,9,newdig,newcure,newdeath,'锦州').tableIng()
				this.tabledatas.push(Jinzhou)
				//阜新
				let Fuxin = await new Tablelist(objlist,7,newdig,newcure,newdeath,'阜新').tableIng()
				this.tabledatas.push(Fuxin)
				//朝阳
				let Chaoyang = await new Tablelist(objlist,3,newdig,newcure,newdeath,'朝阳').tableIng()
				this.tabledatas.push(Chaoyang)
				//葫芦岛
				let Huludao = await new Tablelist(objlist,8,newdig,newcure,newdeath,'葫芦岛').tableIng()
				this.tabledatas.push(Huludao)
			}
		}
	}
</script>

<style scoped>
	.myCharts{width: 100%; }
			.Dizhou-cont {
				margin: 20upx 0;
			}
			.Dizhou {
				font-size: 30upx;
				font-weight: bold;
			}
			.tips{font-size: 25upx; height: 50upx; line-height: 50upx; color: #737373;}
			/* 表格 */
			.table-cont{display: flex; height: 70upx;
			align-items: center; justify-content: space-between;
			font-size: 25upx;}
			.table-cont text{height: 70upx; line-height: 70upx; text-align: center;
			border-right: 1px solid #fff;}
			.table-cont text:nth-child(1){background: #f2f5f7; text-align: left; flex: 2; padding-left: 10upx;}
			.table-cont text:nth-child(2){background: #e8effc; color: #005dff; flex: 1;}
			.table-cont text:nth-child(3){background: #fdeeee; color: #f55253; flex: 1;}
			.table-cont text:nth-child(4){background: #e9f7ec; color: #178b50; flex: 1;}
			.table-cont text:nth-child(5){background: #f2f2f2; color: #66666c; flex: 1;
			border-right: 0;}
			/* 确诊人数 */
			.table-datas text{display: block;height: 70upx; line-height: 70upx; text-align: center;
			}
			.table-datas{font-size: 27upx;display: flex; height: 70upx;
			justify-content: space-between; align-items: center;
			border-bottom: 0.5rpx solid #f2f2f2;}
			.table-datas text:nth-child(1){text-align: left; flex: 2; padding-left: 10upx;}
			.table-datas text:nth-child(2){flex: 1;}
			.table-datas text:nth-child(3){flex: 1;}
			.table-datas text:nth-child(4){flex: 1;}
			.table-datas text:nth-child(5){flex: 1;}
</style>
