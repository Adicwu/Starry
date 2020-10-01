<template>
	<div class="mv-square">
		<BreakHeader title="歌单广场" class="mv-square-header"/>
		<van-tabs v-model="nav.active" class="mv-square-contain" swipeable animated background="rgba(0,0,0,0)">
			<van-tab v-for="(item, index) in nav.list" :key="index" :title="item.text"><div :is="item.comp"></div></van-tab>
		</van-tabs>
	</div>
</template>

<script>
import MvChina from './child/MvChina';
import MvEamerica from './child/MvEamerica';
import MvJapan from './child/MvJapan';
import MvKorea from './child/MvKorea';
export default {
	name: 'mvsquare',
	components: {
		MvChina,
		MvEamerica,
		MvJapan,
		MvKorea
	},
	data() {
		return {
			nav: {
				list: [
					{ text: '国内', comp: 'MvChina' },
					{ text: '日本', comp: 'MvJapan' },
					{ text: '欧美', comp: 'MvEamerica' },
					{ text: '韩国', comp: 'MvKorea' }
				],
				active: 0
			}
		};
	},
	computed: {
		pageType() {
			return this.$route.query.type;
		}
	},
	watch: {
		pageType: {
			immediate: true,
			handler(val) {
				typeof val !== 'undefined' && (this.nav.active = Number(val));
			}
		},
		'nav.active'(val){
			this.$router.replace(`/home/mvsquare?type=${val}`)
		}
	},
	mounted() {}
};
</script>

<style scoped lang="less">
.mv-square {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, .9);
	overflow: hidden;
	z-index: 800;
	.mv-square-header{
		color: #fff;
	}
	.mv-square-contain {
		width: 100%;
		height: 100%;
		& /deep/ .van-tabs__wrap {
			height: 30px;
			&::after{
				border: none;
			}
			.van-tab__text {
				font-size: 12px;
				color: #fff;
			}
		}
		& /deep/ .van-tabs__content {
			height: calc(100% - 78px);
			.van-tab__pane {
				position: absolute;
				height: 100%;
				overflow: hidden;
			}
		}
	}
}
</style>
