<template>
	<view>
		<view class="content">
			<block v-for="(item,index) in homenews" :key="index">
				<view class="content-view" @click="bTns(item.articIds)">
					<view class="content-img">
						<image :src="item.images" mode="aspectFill"></image>
					</view>
					<view class="content-title">
						<text>{{item.titles}}</text>
						<text>{{item.authors}}</text>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	// 引进操作数据库
	let Dbadd = require('../../config/dbbase.js')
	export default{
		data(){
			return{
				homenews:[]
			}
		},
		
		methods:{
				bTns(ids){
					console.log(ids)
					wx.navigateTo({
					url:'../newscoetent/coetent?id=' + ids
				})
			}
		},
		
		async created() {
			let homenews = await new Dbadd('articling').pullGet()
			console.log(homenews)
			this.homenews = homenews.data
		}	
	}
</script>

<style scoped>
	.content{margin: 10upx;}
	text{display: block;}
	.content-view{display: flex; justify-content: space-between;
	height: 190upx !important; overflow: hidden;
	border-bottom: 1rpx solid #E4E8EB; padding-bottom: 15upx;
	margin-bottom: 15upx;
	}
	.content-img{width: 330upx !important; height: 190upx !important;
	}
	.content-img image{width: 100%; height: 100%; border-radius: 10upx;}
	.content-title{
	width: 100%;
	padding-left: 10upx;
	}
	.content-title text:nth-child(1){
		height: 120rpx;
		line-height: 60upx;
		font-size: 30upx;
		font-weight: bold;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.content-title text:nth-child(2){
		font-size: 25upx;
		color: #a6a6a6;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		padding-top: 20upx;
	}
</style>
