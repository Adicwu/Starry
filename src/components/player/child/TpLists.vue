<template>
	<div class="tab-player-lists" :style="{transform: `translateY(${offsetY})`}" @click="open" v-click-outside="close">
		<div class="_contain" ref="contain" :class="{'_contain-transition':transflag}" :style="{transform: `translate3d(${contain.leftX}px,0,0)`}"
		 @touchstart.stop="touchStart" @touchmove.stop="touchMove" @touchend.stop="touchEnd">
			<div class="_contain-item" :class="{'item-prev': contain.index-1===index,'item-next':contain.index+1===index}" v-for="(item,index) in lists"
			 :key="index">
				<div :is="item"></div>
			</div>
		</div>
		<ul class="_nav">
			<li v-for="(item,index) in lists" :class="{'li-active': contain.index===index}" :key="index"></li>
		</ul>
	</div>
</template>
<script>
	import TpCurList from './TpCurList'
	import TpHisList from './TpHisList'
	import TpOldList from './TpOldList'
	export default {
		name: 'tabplayerlists',
		components: {
			TpCurList,
			TpHisList,
			TpOldList
		},
		data() {
			return {
				contain: {
					wid: window.innerWidth,
					leftX: 0,
					offsetX: 0,
					index: 0,
				},
				touch: {
					startX: 0,
					moveX: 0,
					endX: 0,
					startY: 0,
					moveY: 0,
					endY: 0,
				},
				transflag: true,
				visiable: false,
				offsetY: '80%',
				lists: ['TpCurList', 'TpHisList', 'TpOldList']
			}
		},
		watch: {
			visiable(val) {
				this.$emit('visiable',val)
				if (val) {
					this.offsetY = '0'
					window.history.pushState(null, null, document.URL);
					window.onpopstate = this.close;
				} else {
					this.offsetY = '80%'
				}
			}
		},
		methods: {
			touchStart(e) {
				this.touch.startX = e.targetTouches[0].pageX;
				this.transflag = false
			},
			touchMove(e) {
				let touch = e.targetTouches[0];
				let distance = touch.pageX - this.touch.startX + this.contain.offsetX
				this.contain.leftX = Math.min(0, Math.max(distance, -(this.$refs.contain.clientWidth - this.contain.wid)))
			},
			touchEnd(e) {
				this.touch.endX = e.changedTouches[0].pageX
				let distance = this.touch.endX - this.touch.startX
				let scale = this.contain.wid * 0.4
				if (Math.abs(distance) > scale) {
					distance < 0 && this.nextCard()
					distance > 0 && this.prevCard()
				}
				this.transflag = true
				this.contain.leftX = -(this.contain.index * this.contain.wid)
				this.contain.offsetX = this.contain.leftX
			},
			nextCard() {
				(this.contain.index != 2) && this.contain.index++
			},
			prevCard() {
				(this.contain.index != 0) && this.contain.index--
			},
			close() {
				this.visiable = false
			},
			open() {
				this.visiable = true
			}
		}
	}
</script>
<style lang="less" scoped>
	.tab-player-lists {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 420px;
		z-index: 10;
		transition: transform .3s;

		._contain {
			position: relative;
			width: -webkit-max-content;
			height: 100%;
			overflow: hidden;

			&._contain-transition {
				transition: transform .3s;
			}

			._contain-item {
				float: left;
				display: inline-block;
				width: 100vw;
				height: 100%;
				border-radius: 24px;
				transition: all .3s;
				transform: scale(.88) translateX(0);
				background: #fff;

				&.item-prev {
					opacity: .4;
					transform: scale(.88) translateX(40px);
				}

				&.item-next {
					opacity: .4;
					transform: scale(.88) translateX(-40px);
				}
			}
		}

		._nav {
			position: absolute;
			bottom: 400px;
			left: 0;
			right: 0;
			margin: auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 44px;
			height: 20px;

			&>li {
				width: 6px;
				height: 6px;
				border-radius: 50%;
				background: rgba(255, 255, 255, .3);
				transition: all .3s;

				&.li-active {
					width: 12px;
					border-radius: 4px;
					background: rgba(255, 255, 255, .8);
				}

			}
		}
	}
</style>
