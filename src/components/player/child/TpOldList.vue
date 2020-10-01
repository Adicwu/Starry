<template>
	<div class="tab-player-oldlist">
		<div class="_title">
			<b>上次播放</b>
			<a>(0)</a>
		</div>
		<div class="_contain"></div>
	</div>
</template>
<script>
	export default {
		name: 'tabplayeroldlist',
		components: {

		},
		data() {
			return {}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>
<style lang="less" scoped>
	.tab-player-oldlist {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 40px 1fr;
		width: 100%;
		height: 100%;
	
		._title {
			padding: 16px;
			padding-bottom: 0;
			box-sizing: border-box;
	
			b {
				font-size: 1rem;
			}
	
			a {
				margin-left: 4px;
				color: #999;
				font-size: 0.875rem;
			}
		}
	
		._contain {
			padding-top: 10px;
			box-sizing: border-box;
		}
	}
</style>
