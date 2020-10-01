<template>
	<div class="avatar-list">
		<label for="">{{ title }}</label>
		<img :src="value" alt="">
	</div>
</template>

<script>
export default {
	name: 'editinputlist',
	props: {
		title: String,
		value: String
		// value: [String, Number]
	},
	data() {
		return {
		};
	},
	methods: {
		
	}
};
</script>
<style lang="less" scoped>
.avatar-list {
	position: relative;
	display: grid;
	grid-template-columns: 120px 1fr;
	box-sizing: border-box;
	padding: 16px;
	width: 100%;
	&:active{
		background: rgba(0,0,0,.1);
	}
	&::before{
		content: '';
		position: absolute;
		bottom: 0;
		left: 16px;
		display: block;
		width: calc(100% - 16px);
		height: 1px;
		background: #e6e6e6;
		transform: scaleY(.5);
	}
	label{
		align-self: center;
	}
	img{
		justify-self: flex-end;
		width: 40px!important;
		height: 40px!important;
		border-radius: 50%;
	}
}
</style>
