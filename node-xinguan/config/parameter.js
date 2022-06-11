//给前端开发者的字段
class Parameter{
	constructor(body) {
	    this.body = body
	}
	
	//新增确诊
	diagnosisPar(){
		let {
			Abroaddig,
			Shenyangdig,
			Daliandig,
			Anshandig,
			Yingkoudig,
			Liaoyangdig,
			Benxidig,
			Dandongdig,
			Fushundig,
			Tielingdig,
			Panjindig,
			Jinzhoudig,
			Fuxindig,
			Chaoyangdig,
			Huludaodig
		} = this.body
		let arrpar = [
			Abroaddig,
			Shenyangdig,
			Daliandig,
			Anshandig,
			Yingkoudig,
			Liaoyangdig,
			Benxidig,
			Dandongdig,
			Fushundig,
			Tielingdig,
			Panjindig,
			Jinzhoudig,
			Fuxindig,
			Chaoyangdig,
			Huludaodig
		]
		return arrpar
	}
	
	//新增治愈
	curePar(){
		let {
			Abroadcure,
			Shenyangcure,
			Daliancure,
			Anshancure,
			Yingkoucure,
			Liaoyangcure,
			Benxicure,
			Dandongcure,
			Fushuncure,
			Tielingcure,
			Panjincure,
			Jinzhoucure,
			Fuxincure,
			Chaoyangcure,
			Huludaocure
		} = this.body
		let arrpar = [
			Abroadcure,
			Shenyangcure,
			Daliancure,
			Anshancure,
			Yingkoucure,
			Liaoyangcure,
			Benxicure,
			Dandongcure,
			Fushuncure,
			Tielingcure,
			Panjincure,
			Jinzhoucure,
			Fuxincure,
			Chaoyangcure,
			Huludaocure
		]
		return arrpar
	}
	
	//新增死亡
	deathPar(){
		let{
			Abroaddet,
			Shenyangdet,
			Daliandet,
			Anshandet,
			Yingkoudet,
			Liaoyangdet,
			Benxidet,
			Dandongdet,
			Fushundet,
			Tielingdet,
			Panjindet,
			Jinzhoudet,
			Fuxindet,
			Chaoyangdet,
			Huludaodet
		} = this.body
		let arrpar = [
			Abroaddet,
			Shenyangdet,
			Daliandet,
			Anshandet,
			Yingkoudet,
			Liaoyangdet,
			Benxidet,
			Dandongdet,
			Fushundet,
			Tielingdet,
			Panjindet,
			Jinzhoudet,
			Fuxindet,
			Chaoyangdet,
			Huludaodet
		]
		return arrpar
	}
}

module.exports = Parameter