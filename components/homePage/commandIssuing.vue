<template>
	<!-- 按键下发区域 -->
	<view :key="reshPage">
		<view class="titPattern">
			<view v-for="(item,index) in titAry" :key="index" :class="[ index == flagTitClass ? 'titBor':'', 'titBut']" @click="flagTitAry(index, item.flagPar)">
				<text>{{ item.name }}</text>
			</view>
		</view>
		<view class="hostStyle">
			<view class="hostL">
				<view v-for="(item,index) in hostLAry" :class="[ index == flagHostLClass ? 'hostLBor':'', 'hostLBut']" @click="flagHostLAry(index, item.flagPar)">
					<text>{{ item.name }}</text>
				</view>
			</view>
			<view class="hostR">
				<view v-show="flagHostLPar == 'motor'" class="pubHostR">
					<view class="motorBut" v-for="(item,index) in motorAry" v-if="item.flag.indexOf(flagTitPar) > -1 ">
						<view :class="['motorButSty', motorBut == index ? 'bulBut' : '']" @click="motorClick(index)">
							<text>{{ item.name }}</text>
						</view>
					</view>
				</view>
				<view v-show="flagHostLPar == 'light'" class="pubHostR">
					<view class="motorBut" v-for="(item,index) in lightAry" v-if="item.flag.indexOf(flagTitPar) > -1 ">
						<view :class="['motorButSty', lightBut == index ? 'bulBut' : '']" @click="lightClick(index)">
							<text>{{ item.name }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
	    data () {
	        return {
				reshPage: 0, // 页面刷新
				titPat: "", // 选中tit参数
				flagTitPar: "",
				flagTitClass: 0,
				titAry: [
					{ name: "Gold", flagPar: "Gold", value: "" },
					{ name: "Plus", flagPar: "Plus", value: "" },
				],
				flagHostLClass: 0,
				flagHostLPar: "",
				hostLAry: [
					{ name: "马达模式", flagPar: "motor" },
					{ name: "灯光模式", flagPar: "light" },
				],
				motorBut: 0,// 马达按钮
				motorAry:[
					{ name: "1", id: 0, value: "", flag: ["Plus","Gold"] },
					{ name: "2", id: 1, value: "", flag: ["Plus","Gold"] },
					{ name: "3", id: 2, value: "", flag: ["Plus","Gold"] },
					{ name: "4", id: 3, value: "", flag: ["Plus","Gold"] },
					{ name: "5", id: 4, value: "", flag: ["Plus","Gold"] },
					{ name: "6", id: 5, value: "", flag: ["Plus","Gold"] },
					{ name: "7", id: 6, value: "", flag: ["Plus"] },
					{ name: "8", id: 7, value: "", flag: ["Plus"] },
					{ name: "9", id: 8, value: "", flag: ["Plus"]},
					{ name: "10", id: 9, value: "", flag: ["Plus"] },
					{ name: "OFF", id: 10, value: "", flag: ["Plus","Gold"] },
				],
				lightBut: 0,// 灯光按钮
				lightAry:[
					{ name: "6分钟", id: 1, value: "", flag: ["Plus","Gold"] },
					{ name: "8分钟", id: 2, value: "", flag: ["Plus","Gold"] },
					{ name: "10分钟", id: 3, value: "", flag: ["Plus","Gold"] },
					{ name: "12分钟", id: 4, value: "", flag: ["Plus"] },
					{ name: "OFF", id: 5, value: "", flag: ["Plus","Gold"] },
				],
	        }
	    },
	    created () {
	       this.flagHostLPar = this.hostLAry[0].flagPar
		   this.flagTitPar = this.titAry[0].flagPar
	    },
		methods: {
			// 头部按钮切换
			flagTitAry(index, flagPar){
				this.flagTitClass = index
				this.flagTitPar = flagPar
				
				// 按钮复位
				this.motorBut = 0
				this.lightBut = 0
			},
			flagHostLAry(index, flagPar){
				this.flagHostLClass = index
				this.flagHostLPar = flagPar
			},
			// 马达模式按钮
			motorClick(index){
				this.motorBut = index
			},
			// 灯光模式
			lightClick(index){
				this.lightBut = index
			}
		}
	}
</script>

<style lang="scss">
	.titPattern{
		width: 100%;
		height: 80px;
		background-color: #F5F5F5;
		display: flex;
		justify-content: center;
	}
	.titBut{
		background-color: #ffffff;
		margin: 10px 20px;
		width: 60px;
		line-height: 60px;
		text-align: center;
	}
	.titBor{
		border: #007AFF 1px solid;
	}
	.hostStyle{
		height: 250px;
		display: flex;
		flex-direction: row;
	}
	.hostL{
		width: 100px;
		height: 100%;
		background-color: #E1E1E1;
		display: flex;
		flex-direction: column;
	}
	.hostLBor{
		background-color: #ffffff;
	}
	.hostLBut{
		width: 100%;
		height: 50px;
		text-align: center;
		line-height: 50px;
	}
	.hostR{
		width: 100%;
		padding: 10px 0;
	}
	.pubHostR{
		display: flex;
		flex-wrap: wrap;
	}
	.motorBut{
		width: 33%;
		display: flex;
		justify-content: center;
	}
	.motorButSty{
		width: 60px;
		line-height: 35px;
		margin: 5px 0;
		border-radius: 5px;
		border: 1px solid #D3D3D3;
		text-align: center;
	}
	.bulBut{
		border: 1px solid #007AFF;
		background-color: #007AFF;
		color: #ffffff;
	}
</style>