<template>
	<header id="auto-header" :style="{ height: this.height + 'px', transform: 'translateY(-' + top + 'px)' }" class="animated"><slot></slot></header>
</template>

<script>
export default {
	name: 'autoheader',
	data() {
		return {
			top: 0
		};
	},
	props: {
		height: Number,
		dom: String
	},
	watch: {
		$route() {
			this.top = 0;
		}
	},
	mounted() {
		document.querySelector(this.dom).addEventListener('scroll', this.rollMain);
	},
	methods: {
		rollMain() {
			let sc_top = document.querySelector(this.dom).scrollTop;
			setTimeout(() => {
				let msg = this.msg;
				this.msg = sc_top;
				this.msg > msg ? (this.top = this.height) : (this.top = 0);
				msg = null;
			}, 10);
		}
	},
	beforeDestroy() {
		if (this.rolldom != null) {
			this.rolldom.removeEventListener('scroll', this.rollMain);
		}
	}
};
</script>

<style scoped>
#auto-header {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	transition: all 0.4s ease;
}
</style>
