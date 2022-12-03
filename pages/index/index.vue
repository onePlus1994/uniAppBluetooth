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
			informationArea,
		},
		data() {
			return {
				
			}
		},
		methods: {
		
		}
	}
</script>

<style lang="scss">

</style>
