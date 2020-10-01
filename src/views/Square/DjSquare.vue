<template>
	<div class="dj-square" @scroll="mainScroll">
		<BreakHeader title="电台广场" color="#000" />
		<DjBanner />

		<DjRmdList :type="2001" title="创作 | 翻唱" v-if="flags.block1" />
		<DjRmdBlock :type="3001" title="二次元" v-if="flags.block1" />

		<DjRmdList :type="2" title="音乐故事" v-if="flags.block2" />
		<DjRmdBlock :type="3" title="情感调频" v-if="flags.block2" />

		<DjRmdList :type="453050" title="知识技能" v-if="flags.block3" />
		<DjRmdBlock :type="1" title="人文历史" v-if="flags.block3" />

		<DjRmdList :type="8" title="相声曲艺" v-if="flags.block4" />
		<DjRmdBlock :type="6" title="美文读物" v-if="flags.block4" />

		<DjRmdList :type="5" title="脱口秀" v-if="flags.block5" />
		<DjRmdBlock :type="4" title="娱乐 | 影视" v-if="flags.block5" />

		<DjRmdList :type="453052" title="科技可学" v-if="flags.block6" />
		<DjRmdBlock :type="4001" title="校园 | 教育" v-if="flags.block6" />

		<DjRmdList :type="12" title="旅途 | 城市" v-if="flags.block7" />
	</div>
</template>

<script>
import DjBanner from './child/DjBanner';
import DjRmdList from './child/DjRmdList';
import DjRmdBlock from './child/DjRmdBlock';
export default {
	name: 'djsquare',
	components: {
		DjBanner,
		DjRmdList,
		DjRmdBlock
	},
	data() {
		return {
			block: 1,
			flags: {
				block1: true,
				block2: false,
				block3: false,
				block4: false,
				block5: false,
				block6: false,
				block7: false
			}
		};
	},
	mounted() {},
	methods: {
		mainScroll(e) {
			if (this.block === 7) return;
			this.debounce(() => {
				let { scrollTop, offsetHeight, scrollHeight } = e.target;
				if (scrollTop + offsetHeight + 100 > scrollHeight) {
					this.flags['block' + ++this.block] = true;
				}
			}, 100);
		}
	}
};
</script>

<style scoped lang="less">
.dj-square {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.9);
	overflow-x: hidden;
	overflow-y: auto;
	z-index: 800;
	& > div:last-child {
		margin-bottom: 120px;
	}
}
</style>
