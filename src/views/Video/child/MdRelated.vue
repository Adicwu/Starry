<template>
	<transition enter-active-class="animated fadeIn">
		<div class="mv-detail_related" v-if="list.length != 0">
			<p>相关视频</p>
			<ul>
				<MvListCard v-for="(item, index) in list" :key="index" :info="item" />
			</ul>
		</div>
	</transition>
</template>

<script>
import { mvRelated } from 'apis/mv';
import MvListCard from 'comps/card/MvListCard';
export default {
	name: 'mvdetailrelated',
	components: {
		MvListCard
	},
	data() {
		return {
			list: []
		};
	},
	mounted() {
		this.mainRequest();
	},
	methods: {
		mainRequest() {
			mvRelated(this.$parent.mvId).then(res => {
				this.list = res.data.data;
			});
		}
	}
};
</script>

<style scoped lang="less">
.mv-detail_related {
	position: relative;
	z-index: 1;
	border-top: 8px solid #f5f5f5;
	width: 100%;
	p {
		font-size: 14px;
		padding: 16px 0 0 16px;
		font-weight: 800;
	}
}
</style>
