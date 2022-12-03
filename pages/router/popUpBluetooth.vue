<template>
	<view class="">
		<view class="overFlow" :style="{height: windowHeight+'px'}">
			<view v-for="(item,index) in aryList"  :key="index+1" class="flexView" >
				<view class="information">
					<view class="fontTits">{{item.equipmentName}}</view>
					<view class="fontTit">{{item.xxx}}</view>
					<view class="fontTit">{{item.deviceId}}</view>
				</view>
				<view class="rightBut">
					<button class="mini-btn" type="primary" size="mini" @click="createBLEConnection(item.name,item.deviceId)">配对</button>
				</view>
			</view>
		</view>
		<view class="kong">
			<view>
				<button class="mini-btn" type="primary" size="mini">清空</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			windowHeight: {
				type: Number,
				default: 400
			},
		},
	    data () {
	        return {
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
	    created () {
			
	    },
		mounted(){
			
		},
		methods: {
			confirmShare(){
				const that = this
				that.$refs.popup.open()  
			},
			createBLEConnection(name, deviceId){
				
			}
		}
	}
</script>

<style lang="scss">
	.overFlow{
		overflow: auto;
	}
	.flexView{
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin: 10px 0;
	}
	.fontTits{
		font-weight: bold;
		font-size: 16px;
	}
	.kong{
		display: flex;
		height: 60px;
		align-items: center;
		justify-content: flex-end;
		padding-right: 20px;
		uni-button{
			height: 30px;
		}
	}
</style>