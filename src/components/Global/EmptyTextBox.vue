<template>
	<div class="empty-text-box" :style="{ color: color }">{{ text }}</div>
</template>

<script>
export default {
	name: 'EmptyTextBox',
	props: {
		text: String,
		color: {
			type: String,
			default: '#666'
		}
	}
};
</script>
<style lang="less" scoped>
.empty-text-box {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 12px;
	width: 100%;
	height: 200px;
}
</style>
