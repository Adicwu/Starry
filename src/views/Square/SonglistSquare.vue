<template>
	<div class="songlist-square">
		<BreakHeader title="歌单广场" color="#000"/>
		<van-tabs v-model="nav.active" class="songlist-square-contain" swipeable animated background="rgba(0,0,0,0)">
			<van-tab v-for="(item, index) in nav.list" :key="index" :title="item.text"><div :is="item.comp"></div></van-tab>
		</van-tabs>
	</div>
</template>

<script>
import SonglistBoutique from './child/SonglistBoutique';
import SonglistHot from './child/SonglistHot';
import SonglistPopular from './child/SonglistPopular';
import SonglistRmd from './child/SonglistRmd';
export default {
	name: 'songlistsquare',
	components: {
		SonglistBoutique,
		SonglistHot,
		SonglistPopular,
		SonglistRmd
	},
	data() {
		return {
			nav: {
				list: [
					{ text: '推荐', comp: 'SonglistRmd' },
					{ text: '热门', comp: 'SonglistHot' },
					{ text: '精品', comp: 'SonglistBoutique' },
					{ text: '流行', comp: 'SonglistPopular' }
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
			this.$router.replace(`/home/songltsquare?type=${val}`)
		}
	},
	mounted() {}
};
</script>

<style scoped lang="less">
.songlist-square {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.9);
	overflow: hidden;
	z-index: 800;
	.songlist-square-contain {
		width: 100%;
		height: 100%;
		& /deep/ .van-tabs__wrap {
			height: 30px;
			.van-tab__text {
				font-size: 12px;
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
