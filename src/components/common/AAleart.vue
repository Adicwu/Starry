<template>
	<transition enter-active-class="slideInDown" leave-active-class="slideOutUp">
		<div id="aalert" v-show="aalert.flag" @mouseenter="stopAlertFade" @mouseleave="startAlertFade">
			<div>
				<img src="../../assets/img/tx.jpg" alt="" />
				<div>
					<a class="van-icon van-icon-location">{{ currentDate }}</a>
					<p>{{ aalert.text }}</p>
				</div>
			</div>
			<i class="van-icon van-icon-bullhorn-o"></i>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'aalert',
	data() {
		return {
			aalert: {
				flag: false,
				timer: '',
				text: ''
			}
		};
	},
	mounted() {
		window.alert = str => {
			this.aalert.flag = true;
			setTimeout(() => (this.aalert.text = str));
			this.aalert.timer = setTimeout(() => (this.aalert.flag = false), 2000);
		};
	},
	computed: {
		currentDate() {
			let date = new Date();
			let week_arr = ['日', '一', '二', '三', '四', '五', '六'];
			let week = week_arr[date.getDay()];
			return `周${week} ${date.getHours()}:${date.getMinutes()}`;
		}
	},
	methods: {
		stopAlertFade() {
			clearTimeout(this.aalert.timer);
		},
		startAlertFade() {
			this.aalert.timer = setTimeout(() => (this.aalert.flag = false), 1000);
		}
	}
};
</script>

<style lang="less" scoped>
#aalert {
	position: fixed;
	width: 100vw;
	top: 0;
	padding: 24px 20px;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: #fff;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	color: #080808;
	z-index: 9999;
	font-size: 0.75rem;
	border-radius: 0 0 34px 34px;
	animation-duration: 0.6s;
	animation-fill-mode: both;
	user-select: none;
	& > div {
		display: flex;
		align-items: center;
		width: calc(100% - 40px);
		img {
			float: left;
			width: 44px;
			height: 44px;
			border-radius: 50%;
		}
		div {
			float: left;
			width: calc(100% - 44px);
			box-sizing: border-box;
			padding-left: 10px;
			a {
				color: #a3a3a3;
				font-size: 0.75rem;
				&::before {
					margin-right: 4px;
				}
			}
			p {
				font-size: 0.875rem;
				font-weight: 600;
			}
		}
	}
	i {
		font-size: 1.375rem;
	}
}
</style>
