<template>
	<view>
		<!-- 表头 -->
		<homeHeader></homeHeader>
		<!-- <button @click="ccc">fsdfas dfasdf </button> -->
		<!-- 蓝牙断开界面 -->
		<!-- <homePage></homePage> -->
		<!-- 蓝牙功能区 -->
		<view class="countMain">
			<commandIssuing></commandIssuing>
			<informationArea></informationArea>
			<popUpBluetooth></popUpBluetooth>
		</view>
	</view>
</template>
<script>
	import homeHeader from '../../components/headPage/homeHeader.vue';
	import homePage from '../../components/homePage/homePage.vue';
	import commandIssuing from '../../components/homePage/commandIssuing.vue';
	import informationArea from '../../components/homePage/informationArea.vue';
	import popUpBluetooth from '../router/popUpBluetooth.vue';
	export default {
		components:{
			homeHeader,
			homePage,
			commandIssuing,
			informationArea,
			popUpBluetooth
		},
		data() {
			return {
				
			}
		},
		methods: {
			ccc(){
				this.domain.equipmentData["BA"] = (Number(this.domain.equipmentData["BA"]) + 1).toFixed(1)
				uni.$emit("globalData",{
					a:"ddd"
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
