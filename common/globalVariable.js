// 全局变量
export default{
	permanentlySaved: false, // 判断是否永久保存连击数据
	connectAutoStop: true, // 蓝牙配置链接成功后是否断开蓝牙搜寻
	equipmentName: "", // 蓝牙设备链接名称
	deviceId: "",
	serviceId: "",
	characteristicId: "", // 读写数据的蓝牙UUID
	characteristicWatchId: "", // 监听数据的蓝牙UUID
	// equipmentData: {}, // 设备详情数据 
	equipmentData: { BA: "38.0", joyState: "PVSEL", LD: "OFF", IR: "OFF", M1: "OFF", MU: "002", T1: "30.3", T2: "31.2", IL: "019", NM: "000" }, //设备详情数据 
}
