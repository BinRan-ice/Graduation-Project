<script>
	export default {
		onLaunch: function() {
			if(!wx.cloud){
				console.error('微信版本太低，不能用云开发')
			}else{
				wx.cloud.init({
					env:'binran-ice-3ggwdvsp7a4dc70e',
					traceUser:true
				})
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	.menimgsss{width: 100%;}
</style>
