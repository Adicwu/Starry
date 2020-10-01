<template>
	<transition name="fade">
		<div class="request-loader" v-show="visiable">
			<div class="la-line-scale-pulse-out">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'requestloader',
	props: {
		visiable: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style lang="less" scoped>
.request-loader {
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	z-index: 9998;
	.la-line-scale-pulse-out {
		position: relative;
		font-size: 0;
		color: #def;
		width: 40px;
		height: 32px;
		& > div {
			position: relative;
			display: inline-block;
			background-color: currentColor;
			width: 4px;
			height: 32px;
			margin: 0 2px;
			border-radius: 2px;
			animation: line-scale-pulse-out 0.9s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
			&:nth-child(3) {
				animation-delay: -0.9s;
			}
			&:nth-child(2),
			&:nth-child(4) {
				animation-delay: -0.7s;
			}
			&:nth-child(1),
			&:nth-child(5) {
				animation-delay: -0.5s;
			}
			@keyframes line-scale-pulse-out {
				0%,
				100% {
					transform: scaley(1);
				}
				50% {
					transform: scaley(0.3);
				}
			}
		}
	}
}
</style>
