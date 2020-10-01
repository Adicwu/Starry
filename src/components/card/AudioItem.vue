<template>
	<div class="audio-item text-truncate" :class="{ _active: activeMusic }">
		<van-icon name="volume-o" v-if="activeMusic" />
		<span>{{ detail.name }}</span>
		<a>- {{ fullSinger }}</a>
	</div>
</template>

<script>
export default {
	name: 'audioitem',
	props: {
		detail: Object,
		listid: Number
	},
	computed: {
		fullSinger() {
			if (this.detail == null) return '';
			return this.detail.ar.map(item => item.name).join('/');
		},
		sameMusic() {
			if (this.detail == null) return '';
			let key = this.$store.getters.curMusic;
			return typeof key != 'undefined' && key.id === this.detail.id ? true : false;
		},
		sameList() {
			return this.listid === this.$store.state.music.curlistid;
		},
		activeMusic() {
			return this.sameMusic && this.sameList;
		}
	}
};
</script>

<style lang="less" scoped>
.audio-item {
	display: block;
	box-sizing: border-box;
	padding: 10px 16px;
	overflow: hidden;
	&:active {
		background-color: rgba(0, 0, 0, 0.2);
	}
	&._active {
		color: crimson;
		a {
			color: crimson;
		}
	}
	i {
		margin-right: 6px;
	}
	span,
	a {
		white-space: nowrap;
	}
	a {
		font-size: 0.875rem;
		color: #999;
		margin-left: 6px;
	}
}
</style>
