<template>
	<view >
		<publicHeader :title="title"></publicHeader>
		<view :key="pageNum">
			<view v-for="(item,index) in showList" class="titleClass countMain" :key="'showList'+index">
				<view class="titleIcon">
					<uni-icons custom-prefix="iconfont" type="icon-lanya" size="30"></uni-icons>
				</view>
				<view class="information">
					<view class="fontTit">{{item.name}}</view>
					<view class="fontSub">{{item.deviceId}}</view>
				</view>
				<view class="rightBut">
					<button class="mini-btn" type="primary" size="mini" @click="createBLEConnection(item.name,item.deviceId)">配对</button>
				</view>
			</view>
		</view>
		<view>
			<uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
				<view class="shareClass" :key="pageNum"> 
					<view class="title"> 配对成功 </view>
					<view class="shareMain">
						<view > 设备名称： {{ domain.equipmentName }}</view>
						<view > 设备地址： {{ domain.deviceId }}</view>
						<view > 序列号： {{ domain.equipmentData['SN'] }}</view>
					</view>
					<view class="shareFoot">
						<view > 是否要保存此设备到本地？</view>
						<view class="shareBut">
							<button type="default" size="mini" @click="cancelBluePop">取消</button>
							<button type="primary" size="mini" @click="preservationBulPop">保存</button>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import publicHeader from '../../components/headPage/publicHeader.vue';
	export default {
		components:{
			publicHeader
		},
		data() {
			return {
				pageNum: 0,
				title: "添加设备",
				showList: [], //搜寻到的数据
				datastr: "",
				flagSub: "",
				flagRefresh: false,
			} 
		},
		created(){
			this.bleOpenBluetoothAdapter();
		},
		onLoad() {
			// uni.startPullDownRefresh();
		},
		onPullDownRefresh(){
			this.showList = [];
			this.flagRefresh = true
 			setTimeout(function(){
				uni.stopPullDownRefresh();
			},10000)
		},
		computed:{
			userInfo(){
				const {flagRefresh} = this
				return { flagRefresh }
			},
		},
		watch:{
			userInfo: function (e) {
				if(e.flagRefresh){
					this.bleOpenBluetoothAdapter();
					this.flagRefresh = false;
					// 下拉刷新10S后结束刷新
					setTimeout(function(){
						uni.stopBluetoothDevicesDiscovery({
							success(e) {},
							fail(e) {}
						})
					},10000)
				}
			},
		},
		methods: {
			// 保存按钮
			preservationBulPop(){
				const that = this
				that.publicTools.setStorageFun(); //永久保存数据
				this.cancelBluePop();
			},
			// 取消按钮
			cancelBluePop(){
				this.$refs.share.close()
				uni.$emit('homepageControl', false)
				uni.navigateBack({
					delta: 1
				});
			},
			// 初始化蓝牙
			bleOpenBluetoothAdapter: function() {
				let that = this
				uni.openBluetoothAdapter({
					// mode: 'cnetral',// 模式为 cnetral ，此处可不填写
					success(res) {
						// 蓝牙正常打开，开始搜索蓝牙设备
						that.bleStartBluetoothDevicesDiscovery();
					},
					fail(res) {
						// 已经初始化过的情况，需要从 fail 单独处理为 success
						if (res.errMsg == 'openBluetoothAdapter:fail already opened') {
							// 蓝牙正常打开，开始搜索蓝牙设备
							that.bleStartBluetoothDevicesDiscovery();
						} else {
							// 错误情况，弹出提示
							uni.showToast({
							  icon: 'none',
							  title: res.errMsg
							})
						}
					},
					complete(res) {
						// 不论成功与否，暂停下拉刷新效果
						uni.stopPullDownRefresh();
					}
				})
			},
			// 开始搜寻附近的蓝牙外围设备
			bleStartBluetoothDevicesDiscovery() {
				let that = this
				uni.startBluetoothDevicesDiscovery({
					// services: ['FEE7'],  增加条件
					// interval: 0,
					allowDuplicatesKey: false,//是否允许重复上报同一设备。
					success(res) {
						// 开启搜索成功后，监听寻找到新设备的事件
						that.bleOnBluetoothDeviceFound();
					},
					fail(res) {
						// 如果已经开启搜索未关闭，同样 监听寻找到新设备的事件
						if (res.errMsg == 'startBluetoothDevicesDiscovery:fail already discovering devices') {
							that.bleOnBluetoothDeviceFound();
						} else {
							// 错误提示
							uni.showToast({
								icon: 'none',
								title: res.errMsg
							})
						}
					}
				})
			},
			
			// 监听寻找到新设备的事件
			bleOnBluetoothDeviceFound() {
				let that = this
				uni.onBluetoothDeviceFound(function(obj) {
					let list = obj.devices;
					for (let i = 0; i < list.length; i++) {
						// 添加（过滤重复数据）
						that.belDeviceAdd(list[i]);
					}
					// 列表数据整理（条件筛选）
					that.dataRegularization();
				})
			},
			
			// 设备加入，过滤已添加设备
			belDeviceAdd(dev) {
				let that = this
				// 遍历确认是否存在设备
				let selectIdx = -1;
				for (let i = 0; i < that.showList.length; i++) {
					let item = that.showList[i]
					if (item.deviceId == dev.deviceId) {
						selectIdx = i;
						break
					}
				}
				if (selectIdx == -1) {
					// 不存在则追加
					that.showList.push(dev);
				} else {
					// 存在则替换
					that.showList[selectIdx] = dev;
				}
			},
			  
			// 数据整理 
			dataRegularization() {
				var that = this;
				let list = [];
				for (let i = 0; i < that.showList.length; i++) {
					let itemObj = that.showList[i];
					// 考虑可能不存在名称处理
					let name = itemObj.name ? itemObj.name : itemObj.localName;
					let add = true;
					// 空名过滤
					// if (this.FilterEmpty) {
						if (!name) add = false;
					// }
					// 过滤器 - RSSI
					// if (!(itemObj.RSSI > this.FilterRSSI)) add = false
					// 过滤器 - 名称
					// if (this.FilterName.length > 0 && (!name || name.indexOf(this.FilterName)) < 0) add = false
					// 过滤器 - UUID	
					// if (itemObj.advertisServiceUUIDs.length == 0) add = false;
					// 满足条件，添加仅 list
					if (add){
						list.push(itemObj)
					} 
				}
				that.showList = list;
			},
			
			// 创建链接
			createBLEConnection(name,devId) {
			  let that = this
			  uni.createBLEConnection({
			    deviceId: devId,
			    success(res) {
					that.domain.deviceId = devId;
					that.domain.equipmentName = name;
					// 配置连接成功后，是否自动断开搜索
					if (that.domain.connectAutoStop) {
						uni.stopBluetoothDevicesDiscovery({ 
							success(e) {
								console.log('停止搜索蓝牙设备:' + e.errMsg); 
							},
							fail(e) {
								console.log('停止搜索蓝牙设备失败，错误码：' + e.errCode);
							}
						})
					}
					setTimeout(function(){
						// 连接成功后，获取该设备服务列表
						uni.getBLEDeviceServices({
							deviceId: devId,
							success(res) {
								res.services.forEach((item)=>{
									if (res.services.length > 0) {
										that.domain.serviceId = res.services[2].uuid //根据我们的设备  使用的是第三个服务
										// 通过服务，发现特征值
										setTimeout(function() {
											uni.getBLEDeviceCharacteristics({
												deviceId: that.domain.deviceId,
												serviceId: that.domain.serviceId,
												success(res) {
													var flag = true;
													var list = res.characteristics;
													res.characteristics.forEach(item =>{
														if(item.properties.read && item.properties.write && flag){
															that.domain.characteristicId = item.uuid;
															flag = false;
														}
														if(item.properties.notify){
															that.domain.characteristicWatchId = item.uuid;
														}
													})
													// 获取初始化数据
													that.publicTools.bleWriteBLECharacteristicValue('VER');
													setTimeout(function(){
														that.publicTools.bleWriteBLECharacteristicValue('VTP');
													},300)
													setTimeout(function(){
														// 页面蓝牙连接弹出框
														that.$refs.share.open('center')
														that.pageNum += 1
													},500)
													that.belNotifyBLECharacteristicValueChange();
												},
												fail:(res)=>{
													console.log(res);
												}
											})
										}, 300) // 此步骤很重要，通过每个延迟发送请求来避免同时发送请求出现的bug
									}
								})
							}
						})
					},1000)
			    },
				fail(ress){
					console.log(JSON.stringify(ress));
				}
			  })
			},
			
			// 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。
			// 注意：必须设备的特征值支持 notify 或者 indicate 才可以成功调用。 
			// 另外，必须先启用 notifyBLECharacteristicValueChange 才能监听到设备 characteristicValueChange 事件 
			belNotifyBLECharacteristicValueChange() {
				let that = this
				uni.notifyBLECharacteristicValueChange({
					deviceId: that.domain.deviceId,
					serviceId: that.domain.serviceId,
					characteristicId: that.domain.characteristicWatchId,
					state: true,//是否启用 notify
					success(res) {
						// 监听低功耗蓝牙设备的特征值变化事件
						uni.onBLECharacteristicValueChange(function(res1){
							let readText = that.publicTools.ab2hex(res1.value)
							if(that.flagSub == "DA"){
								that.datastr = "";
								that.datastr += readText;
							} else {
								that.datastr += readText;
							}
							that.flagSub = that.datastr.substring(that.datastr.length - 2);
							that.publicTools.dataConversion(that.datastr)
						})
					},
					fail: (res) => {
						uni.showToast({
							icon:'none',
							title:'设备暂不支持接收数据',
							duration:3000
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.titleClass{
		display: flex;
		flex-direction: row;
		padding: 10px 0;
	}
	.titleIcon{
		padding: 10px 20px;
	}
	.information{
		width: 80%;
		padding-top: 5px;
	}
	.rightBut{
		width: 100px;
		padding: 10px 20px;
	}
	.shareClass{
		width: 300px;
		height: 250px;
		.title{
			width: 100%;
			line-height: 40px;
			text-align: center;
			border-bottom: 1px solid #ebeef5;
		}
		.shareMain{
			display: flex;
			flex-direction: column;
			line-height: 30px;
			padding: 10px;
		}
		.shareFoot{
			padding: 0 10px;
			.shareBut{
				display: flex;
				padding: 20px 0px;
			}
		}
	}
</style>
