<template>
	<view  class="navBarClass headPadding">
		<view>
			<uni-nav-bar backgroundColor="#F8F8F8">
				<view slot="left">
					<uni-icons type="list" size="30" @click="openPopUpBluetooth()"></uni-icons>
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
	</view>
</template>
<script>
	export default {
		components:{
			
		},
		data() {
			return {
			
			}
		},
		onLoad() {
		
		},
		methods: {
			openPopUpBluetooth(){
				uni.$emit('openPopUpBluetooth')
			},
			openBlue(){
				uni.navigateTo({
					url:'/pages/router/bluetooth'
				})
			}
		}
	}
</script>

<style lang="scss">
	.navBarClass{
		background: #00BFFF;
		position: fixed;
		width: 100%;
	}
	.defStyle{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
