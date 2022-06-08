<template>
	<view>
		<view v-if="display">
		<view class="report-cont" v-if="!usersing">
			<!-- 基本信息 -->
			<view class="title">基本信息</view>
			<view class="information">
				<text>* 姓名</text>
				<input type="text" v-model="names" placeholder="你的姓名" placeholder-style="color:#bdbdc5"/>
			</view>
			<view class="information">
				<text>* 手机号码</text>
				<input type="number" v-model="iphone" placeholder="你的手机号码" placeholder-style="color:#bdbdc5"/>
			</view>
			<view class="information">
				<text>* 身份证号码</text>
				<view class="discern-cont">
				<view class="discern-inpu"><input type="text" v-model="IDcard" placeholder="你的身份证号码" placeholder-style="color:#bdbdc5"/></view>
				<view class="discern-img" @click="idCard()">
					<image src="../../static/shibie.png" mode="widthFix"></image>
				</view>
				</view>
			</view>
			<view class="information">
				<text>* 性别</text>
				<view class="discern-cont">
				<view class="discern-inpu"><input type="text" v-model="gender[index]" disabled placeholder="请选择你的性别" placeholder-style="color:#bdbdc5"/></view>
				<view class="discern-right">
					<picker @change="bindPickerChange" :value="index" :range="gender">
						<view class="uni-input">选择</view>
					</picker>
				</view>
				</view>
			</view>
			<view class="information">
				<text>* 出生日期</text>
				<view class="discern-cont">
				<view class="discern-inpu"><input type="text" v-model="date" disabled placeholder="请选择出生日期" placeholder-style="color:#bdbdc5"/></view>
				<view class="discern-right">
					 <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">选择</view>
					</picker>
				</view>
				</view>
			</view>
			<view class="information">
				<text>* 户籍所在地</text>
				<view class="discern-cont">
				<view class="discern-inpu"><input type="text" v-model="city" disabled placeholder="请选择户籍所在地" placeholder-style="color:#bdbdc5"/></view>
				<view class="discern-right">
					<picker mode="region" :value="city"  @change="bindcityChange">
						<view class="uni-input">选择</view>
					</picker>
				</view>
				</view>
			</view>
			<view class="information">
				<text>* 居住省/市</text>
				<view class="discern-cont">
				<view class="discern-inpu"><input type="text" v-model="province" disabled placeholder="请选择居住省/市" placeholder-style="color:#bdbdc5"/></view>
				<view class="discern-right">
					<picker mode="region" :value="province"  @change="provinceChange">
						<view class="uni-input">选择</view>
					</picker>
				</view>
				</view>
			</view>
			<view class="information">
				<text>* 详细住址</text>
				<input type="text" v-model="address" placeholder="请填写详细住址" placeholder-style="color:#bdbdc5"/>
			</view>
			<view class="title distance">是否常住辽宁</view>
			<view class="trip">
				<radio-group @change="radioChange">
					<label class="trip-cont" v-for="(item, index) in items" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === current" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</radio-group>
			</view>
			<!-- 是否有如下症状 -->
			<view class="title distance">是否有如下症状</view>
			<view class="trip">
				<block v-for="(item,index) in chitem" :key="index">
				<view class="trip-flex" @click="radioLin(index,item.value)">
					<view class="trip-listing">
						<image src="../../static/weixuanzhong.svg" v-if="item.Selection == 'hide' "></image>
						<image v-else src="../../static/xuanzhong.svg"></image>
					</view>
					<view>{{item.name}}</view>
				</view>
				</block>
			</view>
			<!-- 提交 -->
			<view class="Submit">
				<checkbox-group @change="btnChange">
					<label class="trip-cont trip-bottom" v-for="item in Submitdata" :key="item.value">
						<view>
							<checkbox class="check-sub" :value="item.value" :checked="item.checked" color="#10c963"/>
						</view>
						<view>{{item.name}}</view>
					</label>
				</checkbox-group>
				<!-- 按钮 -->
				<view class="Submit-button" @click="bTns()">
					提交
				</view>
			</view>
		</view>
		<!-- 提示 -->
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<!-- 登录 -->
		<view v-if="usersing" class="wx-button">
			<button  plain="true" open-type="getUserInfo"  @click="getUserInfo()">去登录</button>
		</view>
		</view>
		<!-- 已提交过 -->
		<view class="tipsdata" v-if="already">
			<image src="../../static/chenggong.svg" mode="widthFix"></image>
			<text>{{tipsdata}}</text>
		</view>
	</view>
</template>

<script>
let {log} = console
// 校验
import {check} from '../../config/checking.js'
// 引入提示框
import HMmessages from "@/components/HM-messages/HM-messages.vue"
// 操作数据库
let Dbadd = require('../../config/dbbase.js')
// 处理图片上传的类
let Upload = require('../../config/upload.js')
// 提示
let Errdatas = require('../../config/errdata.js')
export default{
	components: {HMmessages},
	data(){
		return{
			// 是否展示登录
			usersing:true,
			tipsdata:'上报成功',
			already:false,
			display:false,
			names:'',//姓名
			iphone:'',//手机号码
			IDcard:'',//身份证
			// 性别
			gender:['男','女'],
			index:-1,
			date:'',//日期
			city:'',//户籍所在地
			cityvalue:1,
			province:'',//居住省市
			provalue:2,
			address:'',//详细地址
			// 是否常住辽宁
			items:[
			{
				value:'YES',
				name:'是,在辽宁居住半年以上'
			},
			{
				value:'NO',
				name:'否,我是临时来辽宁的'
			}],
			current:-1,
			lodge:'',//接收是否常住辽宁到底选了谁
			Gender:'',//监听收到的性别[最终提交到数据库的]
			// 症状
			chitem:[
				{
					value:'001',
					name:'自觉正常',
					Selection:'hide'
				},
				{
					value:'002',
					name:'发热37ºC以下',
					Selection:'hide'
				},
				{
					value:'003',
					name:'发热37ºC以上',
					Selection:'hide'
				},
				{
					value:'004',
					name:'干咳',
					Selection:'hide'
				},
				{
					value:'005',
					name:'乏力',
					Selection:'hide'
				}
			],
			sympom:[],//监听取到的症状选择
			// 用户勾选同意
			Submitdata:[{
				value:'yes',
				name:'我已阅读本申报所列事项,并保证以上申报内容正确属实',
				checked:false
			}],
			agree:[]//最终用户是否勾选同意
		}
	},
	
	methods:{
		// 性别
		bindPickerChange(e){
			log(e)
			this.index = e.target.value
		},
		// 出生日期
		bindDateChange(e){
			log(e)
			this.date = e.target.value
		},
		// 户籍所在地
		bindcityChange(e){
			log(e)
			this.pUll(e.detail.value,this.cityvalue)
		},
		// 居住省市
		provinceChange(e){
			this.pUll(e.detail.value,this.provalue)
		},
		// 是否常住辽宁
		radioChange(evt){
			log(evt)
			this.lodge = evt.detail.value
		},
		// 上传本地相册或拍照身份证照片
		async idCard(){
			// 得到图片的临时链接地址
			let teimg = await new Upload().upLoadimg()
			wx.showLoading({
			  title: '识别中',
			  mask:true
			})
			let cloudimg = await new Upload().collEctimg(teimg)
			let httpimg = await new Upload().httpImg(cloudimg)
			try{
				let idsu = await new Upload().aiClound(httpimg)
				wx.hideLoading()
				log(idsu)
				this.idSuccess(idsu.result.aicard)
			}catch(e){
				wx.hideLoading()
				throw new Errdatas().errlist()
			}
			
		},
		// 身份证识别的结果
		idSuccess(idsu){
			let {IdNum,Name,Sex,Birth,Address} = idsu
			this.names = Name
			this.IDcard = IdNum
			this.index = Sex == '男' ? this.index = 0 : this.index = 1
			this.date = Birth
			this.city = Address
		},
		// 登录
		async getUserInfo(){
			uni.showToast({
				title:'正在登陆',
				icon:'loading',
				mask:true
			})
			//新的登录接口：wx.getUserProfile
			wx.getUserProfile({
				desc: '登录'
			})
			.then(res=>{
				console.log(res.userInfo)
				// 登录之前先查询之前是否登陆过，是：拉取下来，否：就登陆
				const names = res.userInfo
				this.wxusEr(names)
			})
			.catch(err=>{
				console.log('拒绝登录或登录失败')
				uni.hideToast()
			})
			
		},
		// 请求集合
		async wxusEr(names){
			try{
				let va = await new Dbadd('users').pullGet()
				// log(va)
				if(va.data.length == 0){
					log('以前没有登陆过')
					this.quEry(names)
				}else{
					log('以前登陆过')
					this.stoRage(va)
				}
			}catch(e){
				uni.hideToast()
				this.tips('登录失败','danger')
			}
		},
		// 查询登录状态
		async quEry(names){
			try{
				await new Dbadd('users',names).pullAdd()
				let va = await new Dbadd('users').pullGet()
				this.stoRage(va)
			}catch(e){
				uni.hideToast()
				this.tips('登录失败','danger')
			}
		},
		// 拉取已登录的用户信息并存储到本地
		stoRage(va){
			this.whEre(va.data[0]._openid)
			let nameobj = {
				'avatarUrl':va.data[0].avatarUrl,
				'nickName':va.data[0].nickName,
				'openid':va.data[0]._openid
			}
			uni.setStorageSync('usermen',nameobj)
		},
		// 查询该用户之前时候提交到疫情报告
		async whEre(opi){
			try{
				let obj = {_openid:opi}
				let useropenid = await new Dbadd('tripdata').pullWhere(obj)
				if(useropenid.data.length === 0){
					log('以前没有提交过')
					this.usersing = false
					this.already = false
					this.shOW()
				}else{
					log('以前提交过')
					this.already = true
					this.hiDe()
				}
			}catch(e){
				//TODO handle the exception
				this.tips('服务器错误','danger')
			}
		},
		// 症状选择
		radioLin(index,value){
			log(index + '-' + value)
			// 如果自觉正常
			if(value == '001'){
				log('自觉正常')
				this.$set(this.chitem[index],'Selection','show')
				this.$set(this.chitem[1],'Selection','hide')
				this.$set(this.chitem[2],'Selection','hide')
				this.$set(this.chitem[3],'Selection','hide')
				this.$set(this.chitem[4],'Selection','hide')
				return false
			}
			if(value == '002'){
				log('发热37度以下')
				this.$set(this.chitem[index],'Selection','show')
				this.$set(this.chitem[0],'Selection','hide')
				this.$set(this.chitem[2],'Selection','hide')
				return false
			}
			if(value == '003'){
				log('发热37度以上')
				this.$set(this.chitem[index],'Selection','show')
				this.$set(this.chitem[0],'Selection','hide')
				this.$set(this.chitem[1],'Selection','hide')
				return false
			}
			if(value == '004'){
				log('干咳')
				this.$set(this.chitem[index],'Selection','show')
				this.$set(this.chitem[0],'Selection','hide')
				return false
			}
			if(value == '005'){
				log('乏力')
				this.$set(this.chitem[index],'Selection','show')
				this.$set(this.chitem[0],'Selection','hide')
				return false
			}
		},	
		// 户籍所在地和省市区共用方法
		pUll(values,city){
			var str = ''
			values.forEach((item)=>{
				str += item + ','
			})
			log(str)
			// 去掉最后一个逗号
			if(str.length > 0){
				if(city == 1){
					this.city = str.substr(0,str.length - 1)
				}else if(city == 2){
					this.province = str.substr(0,str.length - 1)
				}
			}
		},	
		// 用户是否勾选同意
		btnChange(env){
			log(env)
			this.agree = env.detail.value
		},
		// 提交
		bTns(){
			log('123')
			let obj = {
				names:this.names,
				iphone:this.iphone,
				IDcard:this.IDcard,
				Gender:this.Gender,
				date:this.date,
				city:this.city,
				province:this.province,
				address:this.address,
				lodge:this.lodge,
				sympom:this.sympom,
				agree:this.agree
			}
			log(obj)
			check(obj)
			.then((res)=>{ 
				log(res)
				if(res == 'SUCCESS'){
					log('全部通过')
					uni.showToast({
						title:'正在提交',
						icon:'loading',
						mask:true
					})
					this.btnBase(obj)
				}else{
					let icon = 'danger'
					this.tips(res,icon)
				}
			})
		},
		// 提交数据到集合
		async btnBase(obj){
			try{
				await new Dbadd('tripdata',obj).pullAdd()
				uni.hideToast();
				this.already = true
				this.hiDe()
			}catch(e){
				uni.hideToast();
				let icon = 'error'
				this.tips('提交失败',icon)
			}
			
		},
		// 提示
		tips(tip,icon){
			this.HMmessages.show(tip,{icon:icon,iconColor:"#ffffff",fontColor:"#ffffff",background:"rgba(255,0,0,.8)"})
		},
		// 是否展示页面
		shOW(){
			this.display = true
		},
		hiDe(){
			this.display = false
		},
		// 用户是否勾选同意
		btnChange(env){
			log(env)
			this.agree = env.detail.value
		},
		// 户籍所在地和省市区共用方法
		pUll(values,city){
			var str = ''
			values.forEach((item)=>{
				str += item + ','
			})
			log(str)
			// 去掉最后一个逗号
			if(str.length > 0){
				if(city == 1){
					this.city = str.substr(0,str.length - 1)
				}else if(city == 2){
					this.province = str.substr(0,str.length - 1)
				}
			}
		},
		//监听是否常住辽宁
		munLiaoning(){
			if(this.lodge == 'YES'){
				this.lodge = this.items[0].name
			}else if(this.lodge == 'NO'){
				this.lodge = this.items[1].name
			}else{
				this.lodge = ''
			}
		},
		// 性别的选择
		mungenDer(){
			if(this.index == 0){
				this.Gender = '男'
			}else if(this.index == 1){
				this.Gender = '女'
			}else{
				this.Gender = ''
			}
		},
		// 症状的选择
		munremovVal(){
			let findarr = this.chitem.filter((item)=>{
				return item.Selection == 'show'
			})
			// log(findarr)
			this.sympom = findarr.map((item)=>{
				return item.name
			})
			log(this.sympom)
		}
	},
	
	created() {
				let setdata = wx.getStorageSync('usermen')
				if(!setdata){
					log('没有用户信息')
					this.usersing = true
					this.shOW()
				}else{
					log('有用户信息')
					this.whEre(setdata.openid)
				}
			},
	
	computed:{
		// 监听时候常住辽宁
		liaoningFun(){
			return this.munLiaoning()
		},
		// 监听性别选择
		genderFun(){
			return this.mungenDer()
		},
		// 监听症状的选择
		removvalFun(){
			return this.munremovVal()
		}
	},
}
</script>

<style scoped>
	.report-cont{margin: 30rpx 17rpx;}
	.title{font-size: 35rpx; font-weight: bold;}
	input{
	height: 70rpx;
	padding-left: 20rpx;}
	.information{font-size: 30rpx;
	margin: 20rpx 0;
	border-bottom: 1px solid #F1F1F1;}
	/* ai识别身份证 */
	.discern-img image{width: 45rpx; height: 45rpx;}
	.discern-cont{display: flex; justify-content: space-between;}
	.discern-inpu{width: 100%;}
	/* 性别 */
	.discern-Gender{display: flex; justify-content: space-between;
	height: 70rpx; align-items: center;}
	.discern-left{padding-left: 20rpx;}
	.discern-right{color: #4d92e0; width: 100rpx; height: 70rpx;
	display: flex;align-items: center; justify-content: flex-end;}
	/* 是否常住辽宁 */
	.distance{margin-top: 30rpx;}
	.trip{font-size: 30rpx;}
	.trip-cont{display: flex;
	align-items: center;
	border-bottom: 1px solid #F1F1F1;
	height: 100rpx;}
	/* 多选*/
	.trip-flex{display: flex; align-items: center;
	height: 100rpx;
	border-bottom: 1px solid #F1F1F1;}
	.trip-listing{width: 50rpx; height: 50rpx; padding-right: 10rpx;}
	.trip-listing image{width: 50rpx; height: 50rpx;}
	/* 提交 */
	.Submit{font-size: 20rpx;}
	.check-sub{transform: scale(0.8,0.8);}
	.trip-bottom{border: none !important;}
	.Submit-button{background: #07c160;
	color: #FFFFFF;
	height: 80rpx; 
	line-height: 80rpx;
	text-align: center;
	font-size: 30rpx;
	border-radius: 10rpx;} 
	/* 登录按钮 */
	.wx-button button{border: none;font-size: 30rpx; 
	background: #07c160;
	color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 400rpx;}
	.wx-button {padding-top: 400rpx;}
	/* 提示 */
	.tipsdata image{width: 140rpx; height: 140rpx; display: block;
	padding-bottom: 20rpx;}
	.tipsdata{font-size: 30rpx;
	width: 140rpx;
	margin: 0 auto; 
	text-align: center; 
	padding-top: 400rpx;}
</style>
