<template>
	<view >
		<!-- 表头 -->
		<homeHeader></homeHeader>
		<view :key="pageNum">
			<!-- 蓝牙断开界面 -->
			<homePage v-show="flagPage"></homePage>
			<!-- 蓝牙功能区 -->
			<view class="countMain" v-show="!flagPage">
				<commandIssuing></commandIssuing>
				<informationArea></informationArea>
			</view>
		</view>
	</view>
</template>
<script>
	import homeHeader from '../../components/headPage/homeHeader.vue';
	import homePage from '../../components/homePage/homePage.vue';
	import commandIssuing from '../../components/homePage/commandIssuing.vue';
	import informationArea from '../../components/homePage/informationArea.vue';
	
	export default {
		components:{
			homeHeader,
			homePage,
			commandIssuing,
			informationArea
		},
		data() {
			return {
				pageNum: 0,
				time: Object,
				flagPage: true
			}
		},
		mounted() {
			let that = this
			// 控制主界面显示隐藏
			uni.$on("homepageControl", function(val){
				that.flagPage = val
				that.pageNum += 1
			})
			that.time = setInterval(function() {
				// 该方法回调中可以用于处理连接意外断开等异常情况
				uni.onBLEConnectionStateChange(function (res) {
					// 处理蓝牙掉线情况
					if(that.domain.deviceId == res.deviceId && !res.connected){
						uni.closeBLEConnection({
							deviceId: res.deviceId,
							success(ress) {
								uni.showToast({
									icon: 'none',
									title: '蓝牙设备意外断开，请重新扫描连接'
								})
								that.flagPage = true
								that.pageNum += 1
							}
						})
					}
				})
			},5000);
		},
		methods: {

		}
	}
</script>

<style lang="scss">

</style>
