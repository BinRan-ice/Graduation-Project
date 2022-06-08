<template>
  <div style="position: relative;" v-bind="listrou">
    <!-- 顶部 -->
    <div class="sidebar-top">
      <div>辽宁省卫健委抗疫中心</div>
      <div @click="signOut()">退出</div>
    </div>
    <div class="sidebar-cont">
      <div v-for="(item,index) in sidebar" :key="item.id">
        <router-link  :to="{path:item.router,query:{item:item.id}}">
        <div class="sidebar-title" @click="sidebarCli(index)">
          <img :src="item.image" />
          <span :class="{activetext:index == num}">{{item.title}}</span>
        </div>
        </router-link>
      </div>
    </div>

    <!--二级路由渲染-->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
      data() {
        return {
           num:1,
           sidebar:[
             {
               'id': 0,
               'image': '',
               'title': '',
               'router':''
             },
             {
               'id': 1,
               'image': require('../../images/home/quezheng.svg'),
               'title': '新增确诊',
               'router':'home'
             },
             {
               'id': 2,
               'image': require('../../images/home/youxuan.svg'),
               'title': '新增治愈',
               'router':'order'
             },
             {
               'id': 3,
               'image': require('../../images/home/siwang.svg'),
               'title': '新增死亡',
               'router':'preferen'
             },
             {
               'id': 4,
               'image': require('../../images/home/xingcheng.svg'),
               'title': '行程上报',
               'router':'variety'
             },
             {
               'id': 5,
               'image': require('../../images/home/wenzhang.svg'),
               'title': '发表文章',
               'router':'message'
             },
             // {
             //   'id': 6,
             //   'image': require('../../images/home/yingxiao.svg'),
             //   'title': '营销管理',
             //   'router':'marketing'
             // },
             // {
             //   'id': 7,
             //   'image': require('../../images/home/shujufenxi.svg'),
             //   'title': '数据分析',
             //   'router':'analysis'
             // }

           ]
        }
      },

      methods:{
        sidebarCli(id){
          // console.log(id)
          this.num = id
          // 存储到本地
          localStorage.setItem("ids", id)
        },


        // 退出登录
        signOut(){
          localStorage.removeItem("token")
          //跳转页面
          this.$router.push({name:'login'})
        }
      },
      
	  // 解决左边切换选中，回退按钮也选中
      beforeCreate() {
		  // 读取
        let ids = localStorage.getItem("ids")
        if(!ids){
          localStorage.setItem("ids", 1)
        }
      },
	  // 解决左边切换选中，回退按钮也选中
      created() {
        let ids = localStorage.getItem("ids")
        this.num = ids
      },

	  computed:{
		  // 解决左边切换选中，回退按钮也选中
		  listrou(){
			  let ids = this.$route.query.item
			  if(ids && ids != undefined){
				  localStorage.setItem("ids", ids)
				  this.num = ids
			  }
		  }
	  }

    }
</script>

<style scoped="scoped">
  .activetext{color: #f4ea2a !important;}
  .sidebar-top{width: 100%; background: #116FEB; height: 50px; color: white;
  display: flex; justify-content: space-between;
  align-items: center;
  position: fixed; top: 0; left: 0; right: 0;
  z-index: 99;
  }
  .sidebar-top div:nth-child(1){padding-left: 22px; font-size: 18px;}
  .sidebar-top div:nth-child(2){padding-right: 22px; cursor:pointer}
  .sidebar-cont{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
  background: #116FEB; width: 180px;
  height: 100vh;
  color: #000000 !important;
  font-size: 16px;
  overflow-y: auto;}
  .sidebar-title img{width: 18px; height: 18px; padding-right: 7px;}
  .sidebar-title{display: flex; align-items: center;
  height: 50px;
  padding: 0 20px;
  color: #000000 !important;}
  /* 提示 */
  .tips{background: red;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  color: #FFFFFF;
  font-size: 15px;
  margin-left: 10px;}

</style>
