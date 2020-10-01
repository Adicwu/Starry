<template>
	<div class="ad-carousel-item" :class="{ _card: isCard, _active_left: isActiveLeft, _active_right: isActiveRight }"><slot></slot></div>
</template>

<script>
export default {
	name: 'adcarouselitem',
	props: {
		keys: {
			type: Number,
			default: 0
		}
	},
	inject: ['type'],
	computed: {
		isCard() {
			return this.type == 'card' ? true : false;
		},
		isActiveLeft() {
			return this.$parent.index == this.keys - 1 && this.isCard ? true : false;
		},
		isActiveRight() {
			return this.$parent.index == this.keys + 1 && this.isCard ? true : false;
		}
	}
};
</script>

<style lang="less" scoped>
.ad-carousel-item {
	position: relative;
	display: inline-block;
	font-size: 1.25rem;
	font-weight: 800;
	width: 100vw;
	height: 100%;
	overflow: hidden;
	z-index: 2;
	&::after {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
}
._card {
	transform: scale(0.85) translateX(0);
}
._active_left {
	z-index: 1;
	transition: 0.3s;
	transform: scale(0.5) translateX(-60%);
}
._active_right {
	z-index: 1;
	transition: 0.3s;
	transform: scale(0.5) translateX(60%);
}
</style>
