<template>
	<div class="fullscreen-scroll" :class="{ _scroll: isScroll }" @touchstart.passive="touchStart" @touchend.passive="touchEnd" ref="contain"><slot /></div>
</template>

<script>
import jQuery from 'jquery';
export default {
	name: 'FullscreenScroll',
	props: {
		offsetTop: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			index: 0,
			startTop: 0,
			screen: {
				height: 0,
				width: 0
			},
			isScroll: true
		};
	},
	watch: {
		index: {
			immediate: true,
			handler(val) {
				this.$emit('indexHanlder', val);
			}
		}
	},
	mounted() {
		this.initData();
	},
	methods: {
		initData() {
			this.screen.height = this.$refs.contain.clientHeight;
			this.screen.width = this.$refs.contain.clientWidth;
		},
		touchStart(e) {
			let { scrollTop } = this.$refs.contain;
			this.startTop = scrollTop;
		},
		touchEnd(e) {
			this.isScroll = false;
			let { scrollTop, scrollHeight } = this.$refs.contain;
			let { contain } = this.$refs;
			let screenHeight = this.screen.height,
				distanc_height = screenHeight * 0.15,
				start_sctop = this.index * screenHeight;
			if (scrollTop > this.startTop) {
				if (scrollTop > start_sctop + distanc_height) {
					this.index++;
				}
			} else {
				if (scrollTop < start_sctop - distanc_height) {
					this.index--;
				}
			}
			jQuery(contain).animate(
				{
					scrollTop: this.index * this.screen.height
				},
				150
			);
			setTimeout(e => {
				this.isScroll = true;
			}, 150);
		}
	}
};
</script>
<style lang="less" scoped>
.fullscreen-scroll {
	position: relative;
	width: 100%;
	height: 100%;
	overflow-x: hidden;
	overflow-y: hidden;

	&._scroll {
		overflow-y: scroll;
	}
}
</style>
