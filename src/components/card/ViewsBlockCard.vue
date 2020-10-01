<template>
	<div class="views-block-card" ref="contain" @click="toMain">
		<ImgLoader class="_cover" :src="cover" ref="cover" />
		<div class="_info">
			<p class="paragraph-truncate">{{ name }}</p>
			<span>{{ elses | numFormat }}+ 播放量</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'viewsblockcard',
	props: {
		cover: String,
		name: String,
		elses: Number,
		id: Number
	},
	methods: {
		toMain() {
			let { contain, cover } = this.$refs,
				query = {
					id: this.id,
					contain: contain.getBoundingClientRect(),
					cover: cover.$el.getBoundingClientRect()
				};
			this.$router.push({
				path: '/home/mvdetail',
				query
			});
		}
	}
};
</script>

<style lang="less" scoped>
.views-block-card {
	position: relative;
	float: left;
	width: 180px;
	height: 220px;
	margin-left: 20px;
	border-radius: 8px;
	overflow: hidden;
	&:last-child {
		margin-right: 20px;
	}
	&::before {
		content: '';
		z-index: 2;
		position: absolute;
		bottom: 0;
		display: block;
		width: 100%;
		height: 40px;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
	}
	._cover {
		position: absolute;
		z-index: 1;
		width: 100%;
		height: 100%;
	}
	._info {
		position: absolute;
		bottom: 0;
		padding: 10px;
		box-sizing: border-box;
		z-index: 3;
		width: 100%;
		height: 46%;
		p {
			font-weight: 600;
			font-size: 1.125rem;
			max-height: 48px;
		}
		span {
			position: absolute;
			bottom: 10px;
			left: 10px;
			font-size: 0.75rem;
			color: rgba(255, 255, 255, 0.8);
		}
	}
}
</style>
