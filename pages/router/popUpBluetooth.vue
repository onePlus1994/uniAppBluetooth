<template>
	<view :key="'popUpBluetooth' + numPage" class="allpopUpBluetooth">
		<scroll-view scroll-y="true" :style="{height: windowHeight+'px'}">
			<view v-for="(item,index) in aryList"  :key="index+1" class="flexView" >
				<view class="information">
					<view class="fontTits">{{item.equipmentName}}</view>
					<view class="fontTit">{{item.sn}}</view>
					<view class="fontTit">{{item.deviceId}}</view>
				</view>
				<view class="rightBut">
					<button v-if="item.deviceId == domain.deviceId" class="mini-btn" size="mini" disabled>已连接</button>
					<button v-else class="mini-btn" type="primary" size="mini" @click="createBLEConnection(item.name,item.deviceId)">连接</button>
				</view>
			</view>
		</scroll-view>
		<view class="kong">
			<view>
				<button class="mini-btn" type="primary" size="mini" @click="clickStorage">清空</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    data () {
	        return {
				numPage: 0,
				windowHeight: 400,
				aryList:[],
				connectData:{
					name: "",
					deviceId: ""
				}
	        }
	    },
	    created () {
			const that = this
			
			//获取设备高度
			uni.getSystemInfo({
				success(res) {
					that.windowHeight = res.windowHeight - 100;
				}
			})
			
			/**
			 * 获取缓存的蓝牙数据
			 * @param {blueTooth} 蓝牙数据缓存Key
			 */
			uni.getStorage({
				key: 'blueTooth',
				success(res) {
					if(res.data && res.data.length > 0 ){
						that.aryList = res.data;
					}
				},
			
			});
	    },
		mounted(){
			const that = this
			
			/**
			 * tool方法equipmentDataTran穿参刷新
			 * @param {allPageRefresh} 数据每次改变统一刷新所有页面
			 */
			uni.$on('allPageRefresh',() =>{
				that.numPage += 1;
			})
		},
		methods: {
			// 清空本地缓存 异步
			clickStorage(){
				let that = this
				that.aryList = [];
				uni.clearStorage();
			},
			createBLEConnection(name, deviceId){
				let that = this
			
			}
			
		}
	}
</script>

<style lang="scss">
	.allpopUpBluetooth{
		uni-button{
			height: 30px;
			width: 80px;
		}
		uni-button[disabled]{
			background-color: #778899;
			color: #FFFFFF;
		}
	}
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
	}
</style>