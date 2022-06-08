// 云函数入口文件
const cloud = require('wx-server-sdk')
const tencentcloud = require("tencentcloud-sdk-nodejs");

cloud.init({
    env:'',
    traceUser:true
})

const OcrClient = tencentcloud.ocr.v20181119.Client;

const clientConfig = {
  credential: {
    secretId: "",
    secretKey: "",
  },
  region: "ap-beijing",
  profile: {
    httpProfile: {
      endpoint: "ocr.tencentcloudapi.com",
    },
  },
};

const client = new OcrClient(clientConfig);

// 云函数入口函数
exports.main = async (event, context) => {
    const params = {"ImageUrl":event.cardimg, "CardSide": "FRONT"};
    try {
        let aicard = await IDcard()
        return {aicard}
    } catch (error) {
        throw {"msg":"识别失败"}
    }

    function IDcard(){
        return new Promise((resolve,reject)=>{
            client.IDCardOCR(params)
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }
}