<template>
	<div class="user-playlist-card" @click="toMainPage('/home/songdetail', info.id)">
		<div class="_cover">
			<ImgLoader class="_cover-img" :src="info.coverImgUrl" />
			<span>{{ info.name }}</span>
		</div>
		<div class="_else">
			<span>
				<i class="van-icon van-icon-fire"></i>
				{{ info.trackCount }}
			</span>
			<span>
				<i class="van-icon van-icon-audio"></i>
				{{ info.playCount }}
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'usplaylistcard',
	props: {
		info: Object
	}
};
</script>

<style lang="less" scoped>
.user-playlist-card {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 240px;
	background: #14171b;
	border-radius: 8px;
	overflow: hidden;
	margin-top: 16px;
	transition: transform 0.3s;
	&:active {
		transform: scale(0.95);
	}
	._cover {
		position: relative;
		width: 100%;
		height: 0;
		padding-bottom: 60%;
		span {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			width: 80%;
			height: -webkit-fit-content;
			text-align: center;
			margin: auto;
			font-size: 22px;
			text-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
			&::first-letter {
				font-size: 40px;
			}
		}
		._cover-img {
			position: absolute;
			width: 100%;
			height: 100%;
		}
	}
	._else {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		span {
			display: inline-flex;
			align-items: center;
			margin-right: 16px;
			height: 20px;
			font-size: 0.75rem;
			i {
				font-size: 1rem;
				margin-right: 6px;
				&.van-icon-fire {
					color: #12c770;
				}
			}
		}
	}
}
</style>
