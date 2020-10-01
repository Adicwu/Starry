<template>
	<ul class="radio-list-items">
		<li class="_item" v-for="(item, index) in selects" :name="index" :key="index" @click="handler(index)">
			<span>{{ item }}</span>
			<i class="van-icon van-icon-success" v-show="index === value"></i>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'radiolistitems',
	props: {
		value: {
			type: Number,
			default: 0
		},
		selects: Array
	},
	methods: {
		handler(val) {
			this.$emit('confirm', val);
		}
	}
};
</script>

<style scoped lang="less">
.radio-list-items {
	padding: 4px 0;
	width: 90%;
	border-radius: 8px;
	background: #fff;
	._item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		padding: 16px 20px;
		font-size: 14px;
		&:active {
			background: rgba(0, 0, 0, 0.2);
		}
		i {
			font-size: 18px;
			color: crimson;
		}
	}
}
</style>
