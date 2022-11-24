<template>
	<view >
		<view class="centerStyle" :style="{height: windowheight + 'px', width: windowWidth + 'px'}">
			<view class="titleIcon">
				<uni-icons custom-prefix="iconfont" type="icon-duankailianjie" size="100"></uni-icons>
			</view>
			<text>连接已断开，请重新链接</text>
		</view>
	</view>
</template>
<script>
    export default {
        data () {
            return {
				windowheight: 0,
				windowWidth: 0
            }
        },
        created () {
			const that = this
            uni.getSystemInfo({
            	success:function(res){
            		that.windowheight = res.windowHeight - 66;
            		that.windowWidth = res.windowWidth;
            	}
            })
        },
		methods: {
			
		}
    }
</script>
<style>
	.centerStyle{
		display: flex;
		align-items: center;
		/* justify-content: center; */
		flex-direction: column;
	}
	.titleIcon{
		margin-top: 40%;
		padding: 20px;
	}
</style>