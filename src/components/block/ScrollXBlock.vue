<template>
	<div class="scrollx-block">
		<div class="_title">
			<a>{{ title }}</a>
			<span @click="more">
				了解所有
				<van-icon name="arrow" />
			</span>
		</div>
		<Scroll scrollX class="_contain">
			<slot name="card"></slot>
		</Scroll>
	</div>
</template>

<script>
export default {
	name: 'scrollxblock',
	props: {
		title: String,
		more: {
			type: Function,
			default: ()=>{}
		}
	}
};
</script>

<style lang="less" scoped>
.scrollx-block {
	width: 100%;
	color: #fff;
	._title {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		font-weight: 600;
		padding-left: 18px;
		a{
			font-size: 24px;
		}
		span{
			margin-right: 10px;
			display: flex;
			align-items: center;
			ing: 2px 4px;
			font-size: 12px;
			color: #A8BBBC;
			i{
				margin-left: 4px;
			}
		}
	}
	._contain {
		margin-top: 20px;
		width: 100%;
	}
}
</style>
