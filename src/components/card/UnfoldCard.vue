<template>
	<div
		class="unflod-card"
		ref="contain"
		:style="{ transform: `translateY(${offsetTop}px)` }"
		:class="{ _active: anmflag, _fixed: fixed, _transition: transition }"
		@click="unflod"
	>
		<div class="_cover"><img :src="cover" alt="" /></div>
		<div class="_header">
			<slot name="header"></slot>
		</div>
		<transition name="fade">
			<div class="_contain" v-show="anmflag">
				<slot name="contain"></slot>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'unflodcard',
	props: {
		cover: String
	},
	data() {
		return {
			anmflag: false,
			offsetTop: 0,
			oldTop: 0,
			fixed: false,
			transition: true,
			timer: null
		};
	},
	watch: {
		anmflag(val) {
			if (val) {
				this.dfBreak();
				this.offsetTop = -(this.$refs.contain.offsetTop - this.$refs.contain.parentNode.scrollTop);
				this.oldTop = this.offsetTop;
				this.timer = setTimeout(() => {
					this.transition = false;
					this.offsetTop = 0;
					this.fixed = true;
					this.timer = null;
				}, 400);
			} else {
				this.offsetTop = 0;
			}
		}
	},
	methods: {
		unflod() {
			if (this.timer != null) return;
			if (this.anmflag) {
				this.fixed = false;
				this.offsetTop = this.oldTop;
				setTimeout(() => {
					this.transition = true;
					this.anmflag = false;
				});
			} else {
				this.anmflag = true;
			}
		},
		dfBreak() {
			window.history.pushState(null, null, document.URL);
			window.onpopstate = this.unflod;
		}
	}
};
</script>

<style lang="less" scoped>
.unflod-card {
	position: relative;
	width: calc(100% - 32px);
	height: 282px;
	margin: 16px;
	box-sizing: border-box;
	overflow: hidden;
	border-radius: 6px;
	background: #fff;
	box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
	&:first-child {
		margin-top: 0;
	}
	&._active {
		margin: 0;
		width: 100vw;
		height: 100vh;
		border-radius: 0;
		z-index: 555;
	}
	&._transition {
		transition: all 0.5s;
	}
	&._fixed {
		position: fixed;
		top: 0;
		left: 0;
		overflow-y: auto;
	}
	._cover {
		width: 100%;
		height: 200px;
		background: silver;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	._header {
		width: 100%;
		box-sizing: border-box;
		padding: 14px;
	}
	._contain {
		width: 100%;
		box-sizing: border-box;
		padding: 16px;
	}
	.fade-enter-active {
		animation: a-fade 0.3s;
	}
	.fade-leave-active {
		animation: a-fade 0.3s reverse;
	}
	@keyframes a-fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
}
</style>
