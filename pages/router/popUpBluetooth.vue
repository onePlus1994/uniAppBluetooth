<template>
	<view class="xxxx">
		<uni-popup ref="popup" background-color="#fff" type="left">
			<view class="popup-content">
				<text class="text">popup 内容</text>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
	    data () {
	        return {
				windowheight: 0,
				windowWidth: 0
	        }
	    },
	    created () {
		
	    },
		mounted(){
			const that = this
			uni.$on("openPopUpBluetooth",function(){
				that.returnUp();
			})
		},
		methods: {
			returnUp(){
				this.$refs.popup.open();
			}
		}
	}
</script>

<style lang="scss">
</style>