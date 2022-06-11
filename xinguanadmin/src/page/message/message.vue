<template>
  <div class="ordering"  v-loading.fullscreen.lock="Loading">
    <!-- 标题 -->
    <div class="home-list">
      <div class="home-title">这是标题</div>
       <el-input v-model="title" placeholder="请输入标题" maxlength="64" show-word-limit></el-input>
    </div>
    <!-- 作者 -->
    <div class="home-list">
      <div class="home-title">作者</div>
       <el-input v-model="author" placeholder="请输入作者" maxlength="8" show-word-limit></el-input>
    </div>
    <!-- 封面图 -->
    <div class="home-list">
      <div class="home-title">上传封面图</div>
      <el-upload
        action="#"
        accept=".jpg,.png,.webp"
        :show-file-list="false"
        list-type="picture-card"
          :auto-upload="false"
        :on-change="successing"
        >
          <img v-if="fileimg" :src="fileimg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <!-- 文章 -->
    <div class="editor-conent">
      <!-- 图片上传组件辅助-->
      <el-upload
        class="avatar-uploader"
        accept=".jpg,.png,.webp"
        :action="serverUrl"
        name="file"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :before-upload="beforeUpload">
      </el-upload>
      <div class="home-title">从这里开始写正文</div>
      <div class="ql-toolbar">
          <div class="quill-view">
            <quill-editor v-model="content" ref="myQuillEditor" style="height: 600px;" :options="editorOption">
            </quill-editor>
          </div>
      </div>
    </div>

    <!-- 发表 -->
    <div class="publish">
      <el-row>
        <el-button size="medium" type="success" @click="submit()">提交</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
// 请求地址
//import quill-editor from 'vue-geng-editor'
import {home} from '../../api/api.js'
import {articleurl,articleimgurl} from '../../api/request.js'
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{'list': 'ordered'}, { 'list': 'bullet' }], // 列表
    [{ color: [] }, { background: [] }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'size': ['12', false, '16', '18', '20', '24'] }], // 字体大小
    [{ 'align': [] }],
    ["image"] //上传图片
  ]
export default{
  data() {
    return {
      content: '这里开始写文章',//文章内容
      quillUpdateImg: false,
      Loading:false,
      editorOption: {
        modules: {
            toolbar: {
              container:toolbarOptions,
             handlers:{
               'image':(value)=> {
                 if(value){
                   // 触发input框选择图片文件
                   document.querySelector('.avatar-uploader input').click()
                 }else{
                   this.quill.format('image', false);
                 }
               }
             }
            }
        }
      },
      serverUrl:articleimgurl,
      title: '',//标题
      author:'',//作者
      fileimg:'',
      files:'',//要上传的图片
    }
  },
  methods:{
    // 富文本图片上传前
    beforeUpload(e) {
      console.log(e)
      // 显示loading动画
      this.Loading = true
    },

    uploadSuccess(res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      console.log(file);
      let quill = this.$refs.myQuillEditor.quill
      console.log(quill)
      // 如果上传成功
      if (res.msg == 'SUCCESS'){
        // 获取光标所在位置
        let length = quill.getSelection().index;
        console.log(length)
        // 插入图片  res.data为服务器返回的图片地址
        quill.insertEmbed(length, 'image', res.data)
        // 调整光标到最后
        quill.setSelection(length + 1)
      }else{
        new this.mytitle(this.$message,'warning','上传图片失败,请重试').funtitle()
      }
      // loading动画消失
      this.Loading = false
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.Loading = false
      new this.mytitle(this.$message,'warning','上传图片失败,请重试').funtitle()
    },

    // 封面图
    successing(file, fileList){
      this.fileimg = file.url
      this.files = file.raw
      console.log(file)
    },

    // 提交
    submit(){
    console.log(this.content)
    console.log(this.files)
      let formdata  = new FormData()
      formdata.append('title', this.title)
      formdata.append('author', this.author)
      formdata.append('file', this.files)
      formdata.append('article', this.content)
      home(articleurl,formdata)
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

    }
  },


}
</script>

<style scoped="scoped">
  @import '../../../style/pubiss.css';
  @import '../../../style/table.css';
  .editor-conent{width: 700px;}
  .publish{position: fixed;
  bottom: 0;
  width:700px;
  height:70px;
  background-color: #fff;
  border-top: 1px solid #d9dadc;
  z-index: 118;
  border-top-width: 0;
  box-shadow: 0 -1px 4px 0 rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  }
  .el-button--medium{width:180px;}
  /* 富文本 */
  .quill-view{height: 800px;
  box-shadow: 0 -1px 4px 0 rgba(0,0,0,0.05);}
</style>
