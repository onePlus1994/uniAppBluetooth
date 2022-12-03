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
		<view>
			<uni-popup ref="popup" background-color="#fff" type="left">
				<view class="allSty">
					<popUpBluetooth :windowHeight="windowHeight"></popUpBluetooth>
				</view>
			</uni-popup>
		</view>
	</view>
</template>
<script>
	import popUpBluetooth from '../../pages/router/popUpBluetooth.vue';
	export default {
		components:{
			popUpBluetooth
		},
		data() {
			return {
				windowHeight: 580,
				aryList:[
					{ equipmentName: '打放大', deviceId: '2D:DA:DA:VE:CD:CD:ER', xxx: 'vodik' },
					{ equipmentName: '打放大', deviceId: '2D:DA:DA:VE:CD:CD:ER', xxx: 'vodik' },
					{ equipmentName: '打放大', deviceId: '2D:DA:DA:VE:CD:CD:ER', xxx: 'vodik' },
					{ equipmentName: '打放大', deviceId: '2D:DA:DA:VE:CD:CD:ER', xxx: 'vodik' },
					{ equipmentName: '打放adsf大', deviceId: '2D:DA:DA:VE:CD:CD:ER', xxx: 'vodik' },
					{ equipmentName: '打放大', deviceId: '2D:DA:DA:VE:CD:CD:ER', xxx: 'vodik' },
					{ equipmentName: '打asd放大', deviceId: '2D:DA:DA:VE:CD:CD:ER', xxx: 'vodik' },
					{ equipmentName: '打放大', deviceId: '2D:DA:DA:VE:CD:CD:ER', xxx: 'vodik' },
					{ equipmentName: '打dafds放大', deviceId: '2D:DA:DA:VE:CD:CD:ER', xxx: 'vodik' },
					{ equipmentName: '打放大', deviceId: '2D:DA:DA:VE:CD:CD:ER', xxx: 'vodik' },
				]
			}
		},
		created() {
			const that = this
			uni.getSystemInfo({
				success(res) {
					that.windowHeight = res.windowHeight - 100
				}
			})
		},
		methods: {
			openPopUpBluetooth(){
				const that = this
				that.$refs.popup.open()  
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
	.allSty{
		width: 300px;
	}
</style>
