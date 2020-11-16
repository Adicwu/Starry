<template>
	<transition enter-active-class="fadeIn" leave-active-class="fadeOut">
		<div class="tplyric">
			<div class="tp_title">
				<p class="text-truncate">{{ $parent.musicName }}</p>
				<span>{{ $parent.singerName }}</span>
			</div>
			<div class="tp_lyric" ref="lyricer" v-click-outside="$parent.closeLyric">
				<ul
					class="tp_lyric-contain"
					ref="contain"
					@touchstart="touchStart"
					@touchmove="touchmove"
					@touchend="touchEnd"
					:class="{ '_contain-trans': transflag }"
					:style="{ transform: `translate3d(0,${contain.topY}px,0)` }"
					v-show="hasLyric"
				>
					<li v-for="(item, index) in lyric" :class="{ 'li-active': index === contain.index - 1 }" :key="index">
						<p>{{ item.text }}</p>
						<p>{{ item.ttext }}</p>
					</li>
				</ul>
				<div class="tp_lyric-none" v-show="!hasLyric">纯音乐</div>
				<transition enter-active-class="fadeIn" leave-active-class="fadeOut">
					<div class="tp_lyric-line" v-show="!transflag && hasLyric" @click="changeCurTime"><span>00:00</span></div>
				</transition>
			</div>
		</div>
	</transition>
</template>
<script>
import { songLyric } from 'apis/song';
export default {
	name: 'tplyric',
	data() {
		return {
			lyric: [],
			lyricerH: 0,
			transflag: true,
			throttleflag: true,
			itemhei: 60,
			timer: null,
			contain: {
				topY: 0,
				hei: 0,
				offsetY: 0,
				index: 0
			},
			touch: {
				startY: 0,
				endY: 0
			}
		};
	},
	watch: {
		'$parent.musicUrl': {
			immediate: true,
			handler(val) {
				this.contain.index = 0;
				val != null && this.getLyric();
			}
		},
		'contain.index'(val) {
			this.changeCurIndex(val);
		},
		'contain.topY'(val) {
			this.transflag && (this.contain.offsetY = val);
		}
	},
	computed: {
		curMusic() {
			return this.$parent.curMusic;
		},
		hasLyric() {
			return this.lyric.length > 1;
		},
		audioDom() {
			return this.$parent.$refs.myaudio;
		}
	},
	mounted() {
		this.lyricerH = Math.round(window.innerHeight * 0.7);
		this.audioDom.addEventListener('timeupdate', this.lyricAuto);
	},
	beforeDestroy() {
		this.audioDom.removeEventListener('timeupdate', this.lyricAuto);
	},
	methods: {
		getLyric() {
			songLyric(this.curMusic.id).then(res => {
				if (typeof res.data.lrc != 'undefined' && res.data.lrc.lyric.length > 1) {
					this.lyricTrans(res.data.lrc.lyric).then(() => {
						if (res.data.tlyric.version != 0) {
							this.tlyricTrans(res.data.tlyric.lyric);
						}
					});
				} else {
					this.lyric.splice(0);
				}
			});
		},
		lyricTrans(val) {
			return new Promise(resolve => {
				let rel = val.split(/[\n]/g).map(item => {
					let time_arr = item.match(/\[([^)]*)\]/);
					let text = item.replace(/\[([^)]*)\]/, '').trim();
					if (time_arr != null) {
						time_arr = this.timeToMs(time_arr[1]);
					}
					return {
						text,
						time: parseInt(time_arr),
						real_time: time_arr,
						ttext: ''
					};
				});
				this.lyric = rel;
				this.getContainHei();
				resolve();
			});
		},
		tlyricTrans(val) {
			val.split(/[\n]/g).forEach((item, index) => {
				this.lyric[index].ttext = item.replace(/\[([^)]*)\]/, '').trim();
			});
		},
		getContainHei() {
			this.$nextTick(() => {
				this.contain.hei = this.lyricerH + this.lyric.length * this.itemhei;
				this.$refs.contain.style.padding = `${this.lyricerH / 2}px 0`;
			});
		},
		touchStart(e) {
			this.touch.startY = e.targetTouches[0].pageY;
			this.transflag = false;
		},
		touchmove(e) {
			let touch = e.targetTouches[0];
			let distance = touch.pageY - this.touch.startY + this.contain.offsetY;
			this.contain.topY = Math.min(0, Math.max(distance, -(this.contain.hei - this.lyricerH)));
		},
		touchEnd(e) {
			this.touch.endY = e.changedTouches[0].pageY;
			this.contain.offsetY = this.contain.topY;
			this.debounce(() => {
				this.transflag = true;
				this.changeCurIndex(this.contain.index);
			}, 2000);
		},
		debounce(fn, del) {
			if (this.timer != null) clearTimeout(this.timer);
			this.timer = setTimeout(fn, del);
		},
		throttle(fn, del) {
			if (!this.throttleflag) return;
			this.throttleflag = false;
			setTimeout(() => {
				fn();
				this.throttleflag = true;
			}, del);
		},
		timeToMs(val) {
			let rel = val.split(':');
			if (rel.length === 2) rel = [rel[0], ...rel[1].split('.')].map(item => Number(item));
			rel = `${parseInt(rel[0] * this.itemhei + rel[1])}.${rel[2]}`;
			return Number(rel) || 0;
		},
		changeCurTime() {
			let audio = this.$parent.$refs.myaudio;
			let index = Math.abs(parseInt(this.contain.topY / this.itemhei));
			this.contain.index = index;
			audio.currentTime = this.lyric[index - 1].time;
			audio.play();
		},
		changeCurIndex(val) {
			let top = -val * this.itemhei;
			this.contain.topY = top;
			this.contain.offsetY = top;
		},
		lyricAuto(e) {
			if (!this.transflag) return;
			this.throttle(() => {
				let curTime = e.target.currentTime;
				let index = this.lyric.findIndex(item => curTime >= item.time - 0.1 && curTime <= item.time + 0.4);
				index != -1 && (this.contain.index = index + 1);
			}, 30);
		}
	}
};
</script>
<style lang="less" scoped>
.tplyric {
	position: absolute;
	width: 100%;
	height: 70%;
	top: 60px;
	animation-duration: 0.3s;
	.tp_title {
		box-sizing: border-box;
		padding: 0 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: flex-start;
		width: 100%;
		height: 60px;
		z-index: 555;
		color: rgba(255, 255, 255, 0.9);
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			display: block;
			width: 100%;
			height: 100%;
			z-index: -1;
		}
		p {
			font-size: 18px;
		}
		span {
			font-size: 12px;
		}
	}
	.tp_lyric {
		position: relative;
		width: 100%;
		height: calc(100% - 60px);
		z-index: 555;
		overflow: hidden;

		.tp_lyric-none {
			position: absolute;
			width: 100%;
			height: 20px;
			text-align: center;
			top: 0;
			bottom: 0;
			margin: auto;
			color: rgba(255, 255, 255, 0.8);
		}
		.tp_lyric-contain {
			position: relative;
			width: 100%;
			overflow: hidden;
			&._contain-trans {
				transition: transform 0.3s;
			}
			li {
				box-sizing: border-box;
				padding: 0 20px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 100%;
				height: 60px;
				color: rgba(255, 255, 255, 0.7);
				font-size: 14px;
				transition: all 0.2s;
				&.li-active {
					color: #fff;
					font-size: 15px;
				}
				& > :last-child {
					font-size: 12px;
				}
			}
		}
		.tp_lyric-line {
			position: absolute;
			top: 0;
			bottom: 0;
			margin: auto 0;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 100%;
			height: 40px;
			color: rgba(255, 255, 255, 0.9);
			animation-duration: 0.2s;
			span {
				float: right;
				margin-right: 20px;
				font-size: 12px;
				padding: 2px 4px;
				background: rgba(0, 0, 0, 0.9);
			}
		}
	}
}
</style>
