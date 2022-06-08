<template>
  <div id="backcont">
  <!-- logo -->
  <div class="meituan-content">
      <div class="login-cont">
        <div class="meituan-title">辽宁省卫健委抗疫管理中心</div>
        <div class="meituan-user">
           <img src="../../images/zhanghao.svg" />
           <el-input v-model="iphone" placeholder="请输入账号"></el-input>
        </div>
        <div class="meituan-user">
          <img src="../../images/mima.svg" />
         <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
        </div>

        <!-- 登录 -->
        <div class="meituan-btn" @click="btNs()">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import {home,getdata} from '../../api/api.js'
  // 请求地址
import {loginurl} from '../../api/request.js'
export default {
      data() {
        return {
           iphone: '',
           password:''
        }
      },

      methods:{
        // 登录
        btNs(){
          let data = {'iphone':this.iphone,'password':this.password}
          home(loginurl,data)
          .then((res)=>{
            console.log(res)
            if(res.data.msg == 'SUCCESS'){
              console.log('登录成功')
              // 存储到本地
              localStorage.setItem("token", res.data.data)
              this.$router.push({name:'home'})
            }else{
              new this.mytitle(this.$message,'warning',res.data.msg).funtitle()
            }
          })
          .catch((err)=>{
            new this.mytitle(this.$message,'info','服务器错误').funtitle()
          })
        },

      },

      
      beforeCreate() {
        console.log('登录页')
        let ids = localStorage.getItem("ids")
        if(!ids || ids != 1){
          localStorage.setItem("ids", 1)
        }
      },

    }
</script>

<style>
  #backcont{background-image: url(../../images/kangyi.jpg);
  background-attachment: fixed;
      background-repeat: no-repeat;
      background-size: cover;
     -webkit-background-size: cover;
      moz-background-size: cover;
      min-height: 100vh;
      }
  .meituan-content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .login-cont{
        width: 500px;
        height: 300px;
        background: #116FEB;
        border-radius: 5px;
  }
  .meituan-title{text-align: center; color: white; font-size: 30px; padding-top: 30px;
  font-family: Arial, Helvetica, sans-serif;}
  .meituan-user{width: 400px; margin: 0 auto; padding-top: 30px; height: 40px;
  display: flex;
  align-items: center;
  }
  .meituan-user img{width: 25px; height: 25px; padding-right: 10px;}
  .meituan-btn{width: 200px; height: 40px; background: #FFEC8B;
  display: flex; align-items: center; justify-content: center; margin: 30px auto 0 auto;
  border-radius: 5px; font-size: 20px; color: white;
  cursor:pointer}
</style>
