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
import {deathurl} from '../../api/request.js'
  export default{
    data() {
      return {
        zhoushi:[
          {
            adderss:'境外输入',
            models:'',
            place:'请填写境外死亡人数'
          },
          {
            adderss:'沈阳市',
            models:'',
            place:'请填写沈阳市死亡人数'
          },
          {
            adderss:'大连市',
            models:'',
            place:'请填写大连市死亡人数'
          },
          {
            adderss:'鞍山市',
            models:'',
            place:'请填写鞍山市死亡人数'
          },
          {
            adderss:'营口市',
            models:'',
            place:'请填写营口市死亡人数'
          },
          {
            adderss:'辽阳市',
            models:'',
            place:'请填写辽阳市死亡人数'
          },
          {
            adderss:'本溪市',
            models:'',
            place:'请填写本溪市死亡人数'
          },
          {
            adderss:'丹东市',
            models:'',
            place:'请填写丹东市死亡人数'
          },
          {
            adderss:'抚顺市',
            models:'',
            place:'请填写抚顺市死亡人数'
          },
          {
            adderss:'铁岭市',
            models:'',
            place:'请填写铁岭市死亡人数'
          },
          {
            adderss:'盘锦市',
            models:'',
            place:'请填写盘锦市死亡人数'
          },
          {
            adderss:'锦州市',
            models:'',
            place:'请填写锦州市死亡人数'
          },
          {
            adderss:'阜新市',
            models:'',
            place:'请填写阜新市死亡人数'
          },
          {
            adderss:'朝阳市',
            models:'',
            place:'请填写朝阳市死亡人数'
          },
          {
            adderss:'葫芦岛市',
            models:'',
            place:'请填写葫芦岛市死亡人数'
          }        
        ]
      }
    },
     methods: {
          // 提交
          btNs(){
              let data = {
                Abroaddet:this.zhoushi[0].models,
                Shenyangdet:this.zhoushi[1].models,
                Daliandet:this.zhoushi[2].models,
                Anshandet:this.zhoushi[3].models,
                Yingkoudet:this.zhoushi[4].models,
                Liaoyangdet:this.zhoushi[5].models,
                Benxidet:this.zhoushi[6].models,
                Dandongdet:this.zhoushi[7].models,
                Fushundet:this.zhoushi[8].models,
                Tielingdet:this.zhoushi[9].models,
                Panjindet:this.zhoushi[10].models,
                Jinzhoudet:this.zhoushi[11].models,
                Fuxindet:this.zhoushi[12].models,
                Chaoyangdet:this.zhoushi[13].models,
                Huludaodet:this.zhoushi[14].models
              }
              home(deathurl,data)
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
