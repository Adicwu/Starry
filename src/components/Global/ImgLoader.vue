<template>
	<div class="img-loader">
		<img class="fadeIn" :src="src" alt="" v-if="loadflag" />
		<div class="_cover" v-if="!loadflag"></div>
	</div>
</template>

<script>
export default {
	name: 'imgloader',
	props: {
		src: String
	},
	data() {
		return {
			loadflag: false
		};
	},
	mounted() {
		let new_img = new Image();
		new_img.src = this.src;
		new_img.onload = e => (this.loadflag = true);
	}
};
</script>

<style lang="less" scoped>
.img-loader {
	position: relative;
	width: 100%;
	height: 100%;
	img {
		position: absolute;
		top: 40%;
		left: 40%;
		width: 20% !important;
		height: 20% !important;
		transform: scale(5);
		animation-duration: 0.3s;
	}
	._cover {
		width: 100%;
		height: 100%;
		background: linear-gradient(to top left, #def, #fff);
		background-size: 400%;
		animation: bgmove 3s infinite;
		@keyframes bgmove {
			0%,
			100% {
				background-position: 0% 50%;
			}

			50% {
				background-position: 100% 50%;
			}
		}
	}
}
</style>
