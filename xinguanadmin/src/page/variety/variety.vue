<template>
  <div class="ordering">
      <!-- 表格布局 -->
      <div class="var-table" v-if="noety">
        <!-- 标题 -->
        <div class="var-title">
          <div v-for="(item,index) in tableData" :key="index">{{item}}</div>
        </div>
        <!-- 内容 -->
        <div>
          <div class="var-content" v-for="(item,index) in datatrip" :key="index">
            <div>
              <span>姓名:{{item.names}}</span>
              <span>手机号码:{{item.iphone}}</span>
              <span>身份证号码:{{item.IDcard}}</span>
              <span class="complete" @click="coMplete(item)">完整信息</span>
            </div>
            <div>{{item.lodge}}</div>
            <div>
              <span v-for="(iteming,index) in item.sympom" :key="index">{{iteming}}</span>
            </div>
          </div>
        </div>
      </div>

      <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        :center="true">
        <div class="complete-Popup" v-for="(item,index) in completedata" :key="index">
          <div>
            <div class="complete-title">个人信息</div>
            <div>
              <span>姓名:{{item.names}}</span>
              <span>手机号码:{{item.iphone}}</span>
              <span>身份证号码:{{item.IDcard}}</span>
              <span>性别:{{item.Gender}}</span>
              <span>出生日期:{{item.date}}</span>
              <span>户籍所在地:{{item.city}}</span>
              <span>居住省市:{{item.province}}</span>
              <span>详细地址:{{item.address}}</span>
            </div>
          </div>
          <div>
            <div class="complete-title">是否常住辽宁</div>
            <div>
              <span>{{item.lodge}}</span>
            </div>
          </div>
          <div>
            <div class="complete-title">是否有如下症状</div>
            <div>
              <span v-for="(iteming,index) in item.sympom" :key="index">{{iteming}}</span>
            </div>
          </div>
        </div>
      </el-dialog>

      <!-- 没有数据 -->
      <div class="nodatas" v-if="!noety">
        还没有上报人员
      </div>
  </div>
</template>

<script>
  import {getdata} from '../../api/api.js'
    // 请求地址
  import {tripurl} from '../../api/request.js'
  export default {
        data() {
          return {
            noety:true,
            dialogVisible: false,
            tableData: ['个人信息','是否常住辽宁','是否有如下症状'],
            completedata:[],
            datatrip:[],
            contarr:[
              {
                'personal':{
                  'name':'马云',
                  'iphone':'15287927735',
                  'IDcard':'9048578900887655789',
                  'Gender':'男',
                  'birthday':'2020-03-27',
                  'residence':'云南省,昆明市，五华区',
                  'Place':'云南省,曲靖市,麒麟区',
                  'address':'建设路121号'
                },
                'yunnan':'是,在云南居住半年',
                'symptom':['发热37度以上','干咳','乏力']
              },
              {
                'personal':{
                  'name':'马化腾',
                  'iphone':'15287927735',
                  'IDcard':'9048578900887655789',
                  'Gender':'男',
                  'birthday':'2020-03-27',
                  'residence':'云南省,昆明市，五华区',
                  'Place':'云南省,曲靖市,麒麟区',
                  'address':'建设路121号'
                },
                'yunnan':'是,在云南居住半年',
                'symptom':['自觉正常']
              }
            ]
          }
        },

		methods:{
        // 完整信息
        coMplete(item){
          console.log(item)
          let arr = []
          arr.push(item)
          this.completedata = arr
          this.dialogVisible = true
        },

        tripData(){
          getdata(tripurl)
          .then((res)=>{
            console.log(res)
            if(res.data.msg == 'SUCCESS'){
              if(res.data.data.length === 0){
                this.noety = false
              }else{
                this.datatrip = res.data.data
              }
            }
          })
          .catch((err)=>{
            console.log(err)
          })
        }

		},

    created() {
      this.tripData()
    }

 }
</script>

<style scoped="scoped">
  @import '../../../style/pubiss.css';
  .var-title{background: #f5f7fa; height: 50px; display: flex; justify-content: space-around;
  align-items: center; font-weight: bold;
  color: #909399;
  }
  .var-title div{width: 200px; text-align: center;}
  .var-table{margin-top: 20px;}
  /* 菜品 */
  .var-content{display: flex; justify-content: space-around; align-items: center;
  height: 120px;
  overflow: hidden;
  border-bottom: 1px solid #ebebeb;}
  .var-content div{width: 270px; text-align: center;}
  .var-content div:nth-child(1){text-align: left;}
  .var-content span{display: block; padding: 5px 0;}
  /* 查看完整 */
  .complete{color: #409EFF;cursor:pointer;}
  /* 没有数据 */
  .nodatas{text-align: center;
  padding-top: 100px;
  color: #C0C4CC;}
  /* 完整弹窗 */
  .complete-Popup span{display: block; padding: 0.375rem 0;}
  .complete-title{font-size: 15px; font-weight: bold; padding: 0.375rem 0;}
</style>
