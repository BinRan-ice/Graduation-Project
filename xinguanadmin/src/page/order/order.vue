<template>
  <div class="ordering">
    <div>
      <div class="home-list" v-for="(item,index) in zhoushi" :key="index">
        <div class="home-title">{{item.adderss}}</div>
         <el-input v-model="item.models"  :placeholder="item.place"></el-input>
      </div>
      <!-- 提交 -->
      <div class="home-list">
        <el-row>
          <el-button type="success" @click="btNs()">提交</el-button>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script>
import {home} from '../../api/api.js'
  // 请求地址
import {cureurl} from '../../api/request.js'
export default{
    data() {
      return {
        zhoushi:[
          {
            adderss:'境外输入',
            models:'',
            place:'请填写境外治愈人数'
          },
          {
            adderss:'沈阳市',
            models:'',
            place:'请填写沈阳市治愈人数'
          },
          {
            adderss:'大连市',
            models:'',
            place:'请填写大连市治愈人数'
          },
          {
            adderss:'鞍山市',
            models:'',
            place:'请填写鞍山市治愈人数'
          },
          {
            adderss:'营口市',
            models:'',
            place:'请填写营口市治愈人数'
          },
          {
            adderss:'辽阳市',
            models:'',
            place:'请填写辽阳市治愈人数'
          },
          {
            adderss:'本溪市',
            models:'',
            place:'请填写本溪市治愈人数'
          },
          {
            adderss:'丹东市',
            models:'',
            place:'请填写丹东市治愈人数'
          },
          {
            adderss:'抚顺市',
            models:'',
            place:'请填写抚顺市治愈人数'
          },
          {
            adderss:'铁岭市',
            models:'',
            place:'请填写铁岭市治愈人数'
          },
          {
            adderss:'盘锦市',
            models:'',
            place:'请填写盘锦市治愈人数'
          },
          {
            adderss:'锦州市',
            models:'',
            place:'请填写锦州市治愈人数'
          },
          {
            adderss:'阜新市',
            models:'',
            place:'请填写阜新市治愈人数'
          },
          {
            adderss:'朝阳市',
            models:'',
            place:'请填写朝阳市治愈人数'
          },
          {
            adderss:'葫芦岛市',
            models:'',
            place:'请填写葫芦岛市治愈人数'
          }
        ]
      }
    },
     methods: {
       // 提交
          btNs(){
              let data = {
                Abroadcure:this.zhoushi[0].models,
                Shenyangcure:this.zhoushi[1].models,
                Daliancure:this.zhoushi[2].models,
                Anshancure:this.zhoushi[3].models,
                Yingkoucure:this.zhoushi[4].models,
                Liaoyangcure:this.zhoushi[5].models,
                Benxicure:this.zhoushi[6].models,
                Dandongcure:this.zhoushi[7].models,
                Fushuncure:this.zhoushi[8].models,
                Tielingcure:this.zhoushi[9].models,
                Panjincure:this.zhoushi[10].models,
                Jinzhoucure:this.zhoushi[11].models,
                Fuxincure:this.zhoushi[12].models,
                Chaoyangcure:this.zhoushi[13].models,
                Huludaocure:this.zhoushi[14].models
              }
              home(cureurl,data)
              .then((res)=>{
                console.log(res)
                if(res.data.msg == 'SUCCESS'){
                  new this.mytitle(this.$message,'success','提交成功').funtitle()
                }else{
                  new this.mytitle(this.$message,'warning',res.data.msg).funtitle()
                }
              })
              .catch((err)=>{
                console.log(err)
              })
            },
     },

     // 进入页面请求数据
     mounted() {

     },
  }
</script>

<style scoped="scoped">
  @import '../../../style/pubiss.css';
  @import '../../../style/table.css';
</style>
