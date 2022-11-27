<template>
	<view  class="navBarClass headPadding">
		<view>
			<uni-nav-bar backgroundColor="#00BFFF">
				<view slot="left">
					<uni-icons style="color: #FFFFFF" type="back" size="30" @click="returnUp()"></uni-icons>
				</view>
				<view class="defStyle">
					<text class="textCol">{{ title }}</text>
				</view>
				<view slot="right">
					<!-- <uni-icons type="plusempty" size="30"></uni-icons> -->
				</view>
			</uni-nav-bar>
		</view>
	</view>
</template>
<script>
	export default {
		components:{
			
		},
		props:{
			title: {
				type: String,
				default: ""
			},
		},
		data() {
			return {
				
			}
		},
		onLoad() {
		
		},
		methods: {
			returnUp(){
				uni.navigateBack({
					delta: 1
				});
				// uni.navigateTo({
				// 	url: 'C?id=1'
				// });
			}
		}
	}
</script>

<style>
	.navBarClass{
		background: #00BFFF;
		position: fixed;
		width: 100%;
	}
	.defStyle{
		width: 100%;
		color: #FFFFFF;
		font-size: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
