//给键值对形式，以对象的形式提交上去
class Objecting{
	constructor(obj) {
	    this.obj=obj
	}
	
	//新增确诊
	objDiagnosis(){
		let data={
			Abroaddig:Number(this.obj[0]),
			Shenyangdig:Number(this.obj[1]),
			Daliandig:Number(this.obj[2]),
			Anshandig:Number(this.obj[3]),
			Yingkoudig:Number(this.obj[4]),
			Liaoyangdig:Number(this.obj[5]),
			Benxidig:Number(this.obj[6]),
			Dandongdig:Number(this.obj[7]),
			Fushundig:Number(this.obj[8]),
			Tielingdig:Number(this.obj[9]),
			Panjindig:Number(this.obj[10]),
			Jinzhoudig:Number(this.obj[11]),
			Fuxindig:Number(this.obj[12]),
			Chaoyangdig:Number(this.obj[13]),
			Huludaodig:Number(this.obj[14])
		}
		return JSON.stringify(data)
	}
	
	//新增治愈
	objcure(){
		let data={
			Abroadcure:Number(this.obj[0]),
			Shenyangcure:Number(this.obj[1]),
			Daliancure:Number(this.obj[2]),
			Anshancure:Number(this.obj[3]),
			Yingkoucure:Number(this.obj[4]),
			Liaoyangcure:Number(this.obj[5]),
			Benxicure:Number(this.obj[6]),
			Dandongcure:Number(this.obj[7]),
			Fushuncure:Number(this.obj[8]),
			Tielingcure:Number(this.obj[9]),
			Panjincure:Number(this.obj[10]),
			Jinzhoucure:Number(this.obj[11]),
			Fuxincure:Number(this.obj[12]),
			Chaoyangcure:Number(this.obj[13]),
			Huludaocure:Number(this.obj[14])
		}
		return JSON.stringify(data)
	}
	
	//新增死亡
	objdeath(){
		let data={
			Abroaddet:Number(this.obj[0]),
			Shenyangdet:Number(this.obj[1]),
			Daliandet:Number(this.obj[2]),
			Anshandet:Number(this.obj[3]),
			Yingkoudet:Number(this.obj[4]),
			Liaoyangdet:Number(this.obj[5]),
			Benxidet:Number(this.obj[6]),
			Dandongdet:Number(this.obj[7]),
			Fushundet:Number(this.obj[8]),
			Tielingdet:Number(this.obj[9]),
			Panjindet:Number(this.obj[10]),
			Jinzhoudet:Number(this.obj[11]),
			Fuxindet:Number(this.obj[12]),
			Chaoyangdet:Number(this.obj[13]),
			Huludaodet:Number(this.obj[14])
		}
		return JSON.stringify(data)
	}
}

module.exports = Objecting