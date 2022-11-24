<template>
	<view >
		<view class="navBarClass">
			<uni-nav-bar backgroundColor="#F8F8F8">
				<view slot="left">
					<uni-icons type="list" size="30" @click="openRecord()"></uni-icons>
				</view>
				<view class="defStyle">
					<view class="fontTit">{{ domain.equipmentName }}</view>
					<view class="fontSub">{{ domain.deviceId }}</view>
				</view>
				<view slot="right">
					<uni-icons type="plusempty" size="30" @click="openBlue()"></uni-icons>
				</view>
			</uni-nav-bar>
		</view>
		<uni-popup ref="popup" background-color="#fff" type="left">
			<view class="popup-content">
				<text class="text">popup 内容</text>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import homePage from './homePage.vue';
	export default {
		components:{
			homePage
		},
		data() {
			return {
			
			}
		},
		onLoad() {
		
		},
		methods: {
			openRecord(){
				this.$refs.popup.open();
			},
			openBlue(){
				uni.navigateTo({
					url:'/pages/router/bluetooth'
				})
			}
		}
	}
</script>

<style>
	.navBarClass{
		padding-top: 22px;
		background-color: #F8F8F8;
	}
	.defStyle{
		width: 100%;
		text-align: center;
	}
</style>
