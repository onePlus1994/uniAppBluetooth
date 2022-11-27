<template>
	<view class="">
		<navigator :url="url" open-type="navigate">
		  <button type="default">在当前页打开</button>
		</navigator>
	</view>
</template>
<script>
	export default {
		components:{
			
		},
		data() {
			return {
				 url:"../router/routeText"
			}
		},
		onLoad() {
		
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	
</style>
