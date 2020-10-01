<template>
	<ScrollXBlock v-if="loadflag" class="ex-boutique-audiolist" title="精品歌单" :more="toMain">
		<CircleCard slot="card" v-for="(item, index) in info" @click.native="toMainPage('/home/songdetail',item.id)" :cover="item.coverImgUrl" :name="item.name" :msg="item.copywriter" :key="index" />
	</ScrollXBlock>
</template>

<script>
import { boutiqueAudioList } from 'apis/list';
import ScrollXBlock from 'comps/block/ScrollXBlock';
import CircleCard from 'comps/card/CircleCard';
export default {
	name: 'exboutiqueaudiolist',
	components: {
		ScrollXBlock,
		CircleCard
	},
	data() {
		return {
			info: [],
			loadflag: false
		};
	},
	mounted() {
		this.mainRequest();
	},
	methods: {
		mainRequest() {
			boutiqueAudioList('全部',6).then(res => {
				this.info = res.data.playlists;
				this.loadflag = true;
			});
		},
		toMain(){
			this.$router.push({
				path: '/home/songltsquare',
				query: {
					type: 2
				}
			})
		}
	}
};
</script>

<style lang="less" scoped>
.ex-boutique-audiolist {
	margin-bottom: 30px;
}
</style>
