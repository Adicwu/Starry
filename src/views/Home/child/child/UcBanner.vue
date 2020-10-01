<template>
	<div class="usercenter-banner">
		<ImgLoader class="user-bg" :src="profile.background" v-if="loadflag" />
		<img :src="dfImg" alt="" v-if="!user.flag" />
		<div class="_userinfo" v-else>
			<div class="_userinfo-avatar" @click="toMainPage('/home/userdetail', user.userid)"><img :src="profile.avatar" alt="" /></div>
			<div class="_userinfo-name">{{ profile.nickname }}</div>
		</div>
		<input type="button" value="登 录" @click="toMainPage('/login')" class="df-btn" v-if="!user.flag" />
		<input type="button" value="SkySquare" class="df-btn" v-else />
	</div>
</template>

<script>
import { userDetail } from 'apis/user';
export default {
	name: 'ucbanner',
	inject: ['user'],
	data() {
		return {
			profile: '',
			loadflag: false
		};
	},
	watch: {
		'user.flag': {
			immediate: true,
			handler(val) {
				val && this.mainRequest();
			}
		}
	},
	methods: {
		mainRequest() {
			if (!this.user.flag) return;
			userDetail(this.user.userid).then(res => {
				this.userProfileInit(res.data.profile);
				this.loadflag = true;
			});
		},
		userProfileInit(val) {
			let info = {
				background: val.backgroundUrl,
				avatar: val.avatarUrl,
				nickname: val.nickname
			};
			this.profile = { ...info };
		}
	}
};
</script>
<style lang="less" scoped>
.usercenter-banner {
	position: relative;
	width: 100%;
	height: 50vh;
	&::before {
		content: '';
		position: absolute;
		top: 0;
		display: block;
		width: 100%;
		height: 60px;
		background: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));
	}
	.user-bg,&>img {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 0 0 36px 36px;
		overflow: hidden;
		z-index: 1;
	}
	.df-btn {
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		bottom: -22px;
		display: block;
		width: 140px;
		height: 38px;
		border-radius: 44px;
		background: crimson;
		color: #fff;
		border: none;
		font-size: 0.875rem;
		z-index: 3;
	}
	._userinfo {
		position: absolute;
		bottom: 40px;
		margin: 0 16px;
		display: flex;
		z-index: 3;
		._userinfo-avatar {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
		}
		._userinfo-name {
			box-sizing: border-box;
			padding: 10px 0;
			padding-left: 10px;
			font-size: 1.125rem;
			font-weight: 600;
		}
	}
}
</style>
