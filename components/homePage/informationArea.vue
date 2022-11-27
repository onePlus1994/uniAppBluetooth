<template>
	<!-- 信息区域 -->
	<view class="allSt" :key="numPage">
		<view class="inforClass">
			<text v-for="(item,index) in tetList" :key="index" style="width: 50%;" :class="index%2==0?'':'textR'">
				{{item.name}}: {{ initialization(item.id) }}
			</text>
		</view>
		<view class="radiusStyle">
			<view :class="[flagStartStop ? 'blue' : 'green', 'radiuBut']" @click="radiuBut()">
				<text>{{ flagStartStop ? "启动" : "停止" }}</text>
			</view>
		</view>
		<view class="cliBut">
			<button class="mini-btn cliButSty" type="primary" size="mini" v-for="item in clickBut">{{ item.name }}</button>
		</view>
		<!-- 版本信息 -->
		<view>
			<view class="editionSty">
				<text class="editionTex othrText">硬件版本: 1.05A</text>
				<text class="editionTex othrText">软件版本: 2.02A</text>
				<button class="mini-btn firmwareBut otBuS" type="default" size="mini">升级固件</button>
			</view>
			<view class="editionSty editionCen ">
				<text class="editionTex othrTex">序列号: A2112-0003</text>
				<text class="editionTex">时间: 20220216</text>
			</view>
			<view class="editionSty">
				<button class="mini-btn firmwareBut" type="primary" size="mini">烧写序列号</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
	    data () {
	        return {
				numPage: 0, //页面刷新
				tetList: [
					{ name: "红灯", id: "IL" },
					{ name: "IR灯", id: "IR" },
					{ name: "主板温度", id: "T1" },
					{ name: "灯板温度", id: "T2" },
					// { name: "电池电压", id: "BA" }
				],
				clickBut:[
					{ name: "短按K1", val: "" },
					{ name: "长按K1", val: "" },
					{ name: "短按K2", val: "" },
					{ name: "长按K2", val: "" },
					{ name: "短按K3", val: "" },
					{ name: "长按K3", val: "" },
				],
				flagStartStop: true
	        }
	    },
	    created () {
	       // this.initialization()
	    },
		mounted(){
			const that = this
			uni.$on("globalData",function(i){
				that.numPage += 1
			})
		},
		methods: {
			initialization(str){
				let that = this
				let flagStr = that.domain.equipmentData[str]
				if(!flagStr || flagStr == "OFF") return "--";
				if( str == "T1" || str == "T2" ){
					return flagStr + "℃"
				} else if( str == "BA" ){
					return flagStr + "V"
				} else {
					return flagStr
				}
			},
			// 启停按钮
			radiuBut(){
				let that = this
				that.flagStartStop = !that.flagStartStop
			}
		}
	}
</script>

<style lang="scss">
	.allSt{
		background-color: #F5F5F5;
		padding: 20px;
	}
	.inforClass{
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 5px;
	}
	.textR{
		text-align: right;
	}
	.radiusStyle{
		display: flex;
		justify-content: center;
		text-align: center;
	}
	.radiuBut{
		margin: 40px 0 20px 0;
		height: 100px;
		width: 100px;
		line-height: 100px;
		border-radius: 100px;
		color: #ffffff;
	}
	.blue{
		background-color: #007AFF;
	}
	.green{
		background-color: #32B432;
	}
	.cliBut{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.cliButSty{
		width: 100px;
		line-height: 35px;
		margin: 10px 20px;
	}
	.editionSty{
		display: flex;
		justify-content: space-around;
		margin: 10px 0;
	}
	.othrText{
		margin-right: 10px;
	}
	.otBuS{
		background-color: #C0C0C0;
		color: #191919;
	}
	.otBuS:active{
		background-color: #F0F8FF;
	}
	.editionTex{
		width: 130px;
		font-size: 14px;
		color: #808080;
		line-height: 35px;
		text-align: center;
	}
	.firmwareBut{
		width: 100px;
		line-height: 35px;
	}
	.othrTex{
		width: 140px;
		margin-right: 10px;
	}
	.editionCen{
		justify-content: center;
	}
</style>