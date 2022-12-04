import commonVariable from "./globalVariable.js"
export default{
	
	// 将16进制的内容转成我们看得懂的字符串内容
	hexCharCodeToStr(hexCharCodeStr) {
		var trimedStr = hexCharCodeStr.trim();
		var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
		var len = rawStr.length;
		if (len % 2 !== 0) {
			alert("存在非法字符!");
			return "";
		}
		var curCharCode;
		var resultStr = [];
		for (var i = 0; i < len; i = i + 2) {
			curCharCode = parseInt(rawStr.substr(i, 2), 16);
			resultStr.push(String.fromCharCode(curCharCode));
		}
		return resultStr.join("");
	},
	
	// ArrayBuffer转16进度字符串示例
	ab2hex(buffer) {
		var hexArr = Array.prototype.map.call(
			new Uint8Array(buffer),
			function(bit) {
				return ('00' + bit.toString(16)).slice(-2);
			}
		)
		var strBuffer = this.hexCharCodeToStr(hexArr.join(''));
		return strBuffer;
		// return hexArr.join('');
	},
	
	// ArrayBuffer转为字符串，参数为ArrayBuffer对象
	ab2str(buf) {
	   return String.fromCharCode.apply(null, new Uint16Array(buf));
	},
	 
	// 字符串转为ArrayBuffer对象，参数为字符串
	str2ab(str) {
		if (!str) {
			return new ArrayBuffer(0);
		}
	    var buffer = new ArrayBuffer(str.length);
	    // let dataView = new DataView(buffer);
	    var bufView = new Uint8Array(buffer);
	    for (var i = 0, strLen = str.length; i < strLen; i++) {
	    	bufView[i] = str.charCodeAt(i);
	    }
	    return bufView;
	},
	
	// 向低功耗蓝牙设备特征值中写入二进制数据。
	// 注意：必须设备的特征值支持 write 才可以成功调用。
	bleWriteBLECharacteristicValue(str) {
		if(!str){
			return
		}
		let buffer = this.str2ab(str);
		console.warn(buffer)
		// 通过 tool.js 方法将字符串转ArrayBuffer
		uni.writeBLECharacteristicValue({
			deviceId: commonVariable.deviceId,
			serviceId: commonVariable.serviceId,
			characteristicId: commonVariable.characteristicId,
			value: buffer,
			// writeType: 'write',
			success(res) {
			    uni.showToast({
					icon: 'none',
					title: '写入成功'
				})
			},
			fail(){
	
			}
		})
	},
	
	dataConversion(str){
		let that = this
		if(!str){
			return
		}
		let start = str.substring(0,3);
		let end = str.substring(str.length-2,str.length);
		if('JOY' == start && 'DA' == end){
			that.equipmentDataTran(str);
		}
	},
	
	/**
	 * 转换设备上报的数据命令，并写入到公共参数里面
	 * @param {allPageRefresh} 数据每次改变统一刷新所有页面
	 */
	equipmentDataTran(str){
		let that = this
		if(!str) return;
		// JOY:BA:380 PVSEL LDOFF IROFF M1:OFF MU:002 T1:30.3 T2:31.2 IL:019 NM:000 DA
		let newStr = str.substring(4,str.length-3);
		let list = newStr.split(" ");
		let aryObj = {};
		let flagAry = ["WAIT", "PDRUN", "PVSEL", "PFBLE"]; //状态:  禁用--WAIT  开机--PDRUN 待机--PVSEL 蓝牙等待--PFBLE
		list.forEach( item => {
			var ary = item.split(":")
			if(ary[1]){
				if("BA" == ary[0]){
					aryObj[ary[0]] = (Number(ary[1])/10).toFixed(1);
				} else {
					aryObj[ary[0]] = ary[1];
				}
			}else{
				if(flagAry.indexOf(ary[0]) < 0){
					aryObj[ary[0].substring(0,2)] = ary[0].substring(2,ary[0].length);
				} else {
					aryObj["joyState"] = ary[0];
				}
			}
		});
		commonVariable.equipmentData = Object.assign(commonVariable.equipmentData,aryObj);
		uni.$emit('allPageRefresh'); //页面刷新
	},
	
	/**
	 * 缓存蓝牙设备
	 * @param {blueTooth} 蓝牙数据缓存Key
	 */
	setStorageFun(){
		let that = this
		let key = 'blueTooth';
		let obj = {
			 equipmentName: commonVariable.equipmentName, 
			 deviceId: commonVariable.deviceId, 
			 sn: commonVariable.equipmentData['SN']
		};
		let ary = [obj];
		uni.getStorage({
			key: key,
			success(res) {
				// res.data.forEach( (v,i) => {
					
				// })
				console.log(res.data);
			},
			fail(refs){
				that.setStorage(key,ary);
			}
		});
		// uni.setStorage('storage_key', 'hello');
		// uni.getStorage('storage_key') 
	},
	
	setStorage(key,obj){
		uni.setStorage({
			key: key,
			data: JSON.stringify(obj),
			success: function () {
				console.log('success');
			}
		});
	}
}
