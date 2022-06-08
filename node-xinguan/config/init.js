//给前端的body响应
class initdata{
	constructor(ctx,msg='SUCCESS',data=[],code=200) {
	    this.ctx=ctx;
		this.msg=msg
		this.data=data
		this.code=code
	}
	
	//以2开头的响应
	listing(){
		this.ctx.body={
			msg:this.msg,
			data:this.data
		}
		this.ctx.status=this.code
	}
	
	//错误的响应
	tips(tipmsg,codes){
		this.ctx.body={
				msg:tipmsg
		}
		this.ctx.status=codes
	}
}

module.exports=initdata

