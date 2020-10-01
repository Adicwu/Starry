<template>
	<ul class="avatars-handler" :style="{ width }" @click="openUnfold" v-click-outside="closeUnfold">
		<li v-for="(item, index) in avatars" :style="{ transform: `translateX(${index * unfold}px)` }" :key="index"><img :src="item" alt="" /></li>
	</ul>
</template>

<script>
export default {
	name: 'avatarshandler',
	props: {
		avatars: Array,
		width: {
			type: String,
			default: '100px'
		}
	},
	data() {
		return {
			unfold: 6
		};
	},
	methods: {
		openUnfold() {
			this.unfold = 40;
		},
		closeUnfold() {
			this.unfold = 6;
		}
	}
};
</script>

<style lang="less" scoped>
.avatars-handler {
	position: relative;
	height: 50px;
	& > li {
		position: absolute;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		overflow: hidden;
		top: 0;
		left: 0;
		transition: transform 0.3s;
	}
}
</style>
