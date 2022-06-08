<!-- 看下面的操作之前，你至少要了解微信云开发，并且会手动操作增删改查，不明白的先看微信云开发基础课程 -->

《一》打开Hbuidelx工具，将wx-xinguan代码引入该工具，打开manifest.json文件，配置微信小程序的appid
《二》打开微信开发者工具，随便新建一个项目进入，填写appid（同第一步appid保持一致）
1.微信开发者工具开通云开发控制台，在云开发控制台新建以下云储存，数据库，命名保持一致

（1）新建数据库：
命名：adminuser         数据权限：所有用户可读，仅创建者可读写
命名：articlecontent    数据权限：所有用户可读，仅创建者可读写
命名：articleing        数据权限：所有用户可读，仅创建者可读写
命名：curedata          数据权限：所有用户可读，仅创建者可读写
命名：deathdata		   数据权限：所有用户可读，仅创建者可读写
命名：diagnosis		   数据权限：所有用户可读，仅创建者可读写
命名：tripdata		   数据权限：所有用户可读，仅创建者可读写
命名：users			   数据权限：仅创建者可读写

（2）新建云存储：命名：idcard   存储权限：所有用户可读，仅创建者可读写

（3）云函数，打开xinguan-card在pull.js文件new Credential里两个"",改为你自己的腾讯云账号，index.js里的env改为你自己的云开发环境
保存后上传到云函数，这里的云函数是身份证识别，不明白的看下课程这一块

2.打开hubidelx编辑器，App.vue里的env改为你自己的云环境，保持和上一步环境一致

<!--  --------------------------------上面填写之后在hbuildex编辑器里运行到微信小程序----------------- -->



《三》nodejs后端，这是接口代码
1.打开config/publicapi.js文件，
（1）appid，secret改为你自己的
grant_type:'client_credential',
appid:'小程序appid',
secret:'小程序秘钥'
（2）云环境env改为你自己的

2.打开uploadimg/uploadimg.js文件，把accessKeyId，accessKeySecret，bucket改为你自己的，不明白看课程，阿里云oss上传
accessKeyId: '阿里云ketid',
accessKeySecret: '阿里云KeySecret',
bucket: '阿里云bucket',

<!-- ---------------以上填写后，nodemon app.js启动nodejs代码 -->

《四》后台管理前端，只需在根目录下执行npm install 成功后（不成功再次执行），再执行npm run dev启动后台管理
