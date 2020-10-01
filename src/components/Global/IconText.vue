<template>
	<div class="icon-text">
		<i :class="info.icon"></i>
		<span>{{info.text}}</span>
	</div>
</template>

<script>
	export default{
		name: 'icontext',
		props:{
			info: Object,
		},
	}
</script>

<style lang="less" scoped>
	.icon-text{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 50px;
		color: rgba(255,255,255,.9);
		i{
			font-size: 1.75rem;
		}
		span{
			margin-top: 4px;
			font-size: 0.75rem;
		}
	}
</style>
