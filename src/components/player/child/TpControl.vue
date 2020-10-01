<template>
	<div class="_control" :class="{ '_active-control': switchflag }">
		<span class="van-icon _control-islike" @click.stop="islikeHandler" :class="[islike ? 'van-icon-like' : 'van-icon-like-o']" v-show="!switchflag"></span>
		<span class="fa fa-backward" :class="{ '_active-control-span': switchflag }" v-show="switchflag" @click.stop="$store.dispatch('prevMusic')"></span>
		<div class="_control-play" v-show="switchflag" @click="$store.commit('musicPlay')"><van-icon :name="muscicStatus" /></div>
		<span v-show="!switchflag"></span>
		<span class="fa fa-forward" :class="{ '_active-control-span': switchflag }" @click.stop="$store.dispatch('nextMusic')"></span>
	</div>
</template>
<script>
import { userLikelist, songLikeHandler } from 'apis/user';
export default {
	name: 'tpcontrol',
	data() {
		return {
			islike: false,
			likelist: []
		};
	},
	inject: ['user'],
	computed: {
		switchflag() {
			return this.$parent.switchflag;
		},
		muscicStatus() {
			return this.$parent.muscicStatus;
		},
		curMusic() {
			return this.$parent.curMusic;
		}
	},
	watch: {
		'$parent.musicUrl': {
			immediate: true,
			handler(val) {
				if (val != null) {
					this.islikeJudge();
				}
			}
		},
		likelist(val) {
			this.curMusic != null && this.islikeJudge();
		}
	},
	mounted() {
		this.mainRequest();
	},
	methods: {
		mainRequest() {
			if (!this.user.flag) return;
			userLikelist(this.user.userid).then(res => {
				this.likelist = res.data.ids;
			});
		},
		islikeJudge() {
			if (!this.user.flag) return;
			let index = this.likelist.indexOf(this.curMusic.id);
			this.islike = index !== -1;
		},
		islikeHandler() {
			if (!this.user.flag) return this.$toast('请先登录');
			songLikeHandler(this.curMusic.id, !this.islike).then(res => {
				this.islike = !this.islike;
				this.mainRequest();
			});
		}
	}
};
</script>
<style lang="less" scoped>
._control {
	position: absolute;
	top: 0;
	right: 0;
	display: grid;
	grid-template-columns: 42px 70px 42px;
	grid-auto-rows: 1fr;
	width: 154px;
	height: 50px;
	&._active-control {
		width: 70%;
		height: 70px;
		top: 410px;
		left: 0;
		margin: auto;
		grid-template-columns: 60px 1fr 60px;
		span {
			color: #fff;
		}
	}
	._control-play {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		justify-self: center;
		width: 70px;
		height: 70px;
		border-radius: 50%;
		background: crimson;
		.common {
			content: '';
			box-sizing: border-box;
			display: block;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			border: 1px solid crimson;
			border-radius: 50%;
		}
		&::before {
			.common;
			animation: anm 2s infinite;
		}
		&::after {
			.common;
			animation: anm 2s 0.6s infinite;
		}
		@keyframes anm {
			from {
				transform: scale(0.8) translateZ(0);
				opacity: 0.8;
			}
			to {
				transform: scale(1.4) translateZ(0);
				opacity: 0;
			}
		}
		i {
			font-size: 44px;
			color: rgba(255, 255, 255, 0.8);
		}
	}
	& > span {
		font-size: 1.25rem;
		align-self: center;
		justify-self: center;
		background: linear-gradient(to left bottom, #68f9e4, #0bdfec);
		-webkit-background-clip: text;
		color: transparent;
		&._active-control-span {
			font-size: 26px;
		}
		&:active {
			background: #717171;
			-webkit-background-clip: text;
			color: transparent;
		}
	}
	._control-islike {
		color: crimson;
	}
}
</style>
