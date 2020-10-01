<template>
	<BotLoadRequest
		class="mv-china"
		:request="newRankMv"
		:perpage="3"
		resword="data"
	>
		<template #contain="{curdata}">
			<div class="_contain">
				<MvLgCard v-for="(item, index) in curdata" :info="item" :key="index" />
			</div>
		</template>
	</BotLoadRequest>
</template>

<script>
	import {rankMv} from 'apis/mv'
	import MvLgCard from 'comps/card/MvLgCard';
	export default{
		name: "mvchina",
		components: {
			MvLgCard
		},
		data() {
			return {
				
			};
		},
		mounted() {
			
		},
		methods:{
			newRankMv(key){
				return rankMv(key,'内地');
			}
		}
	}
</script>

<style scoped lang="less">
	.mv-china{
		width: 100%;
		height: 100%;
		._contain{
			width: 100%;
		}
	}
	
</style>
