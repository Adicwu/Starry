<template>
	<BotLoadRequest
		class="mv-eamerica"
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
		name: "mveamerica",
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
				return rankMv(key,'欧美');
			}
		}
	}
</script>

<style scoped lang="less">
	.mv-eamerica{
		width: 100%;
		height: 100%;
		._contain{
			width: 100%;
		}
	}
	
</style>
