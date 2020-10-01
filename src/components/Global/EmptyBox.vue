<template>
	<van-empty class="empty-box" image="https://css.adicw.cn/m-empty.png" :description="text" />
</template>

<script>
export default {
	name: 'emptybox',
	props: {
		text: {
			type: String,
			default: '没有东西嗷'
		}
	}
};
</script>

<style lang="less" scoped></style>
