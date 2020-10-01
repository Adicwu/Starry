<template>
	<div class="tab-player-curlist" v-if="reloadflag">
		<div class="_title">
			<b>当前播放</b>
			<a>({{list.length}})</a>
		</div>
		<BotLoadAudioList
			v-if="hasList"
			class="_contain"
			type="item"
			:data="list"
			:listid="listId"
			:perpage="10"
		/>
	</div>
</template>
<script>
	export default {
		name: 'tabplayercurlist',
		data() {
			return {
				reloadflag: true
			}
		},
		computed: {
			list() {
				return this.$store.state.music.curlist
			},
			listId() {
				return this.$store.state.music.curlistid
			},
			hasList() {
				return this.list.length > 0
			}
		},
		watch: {
			list(newVal, oldVal) {
				this.reload()
			}
		},
		methods: {
			changeMusic(index) {
				let obj = {
					list: this.list,
					id: this.listId,
					index
				};
				this.$store.dispatch('changeCurMusic', obj);
			},
			reload() {
				this.reloadflag = false
				setTimeout(()=>{
					this.reloadflag = true
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.tab-player-curlist {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 40px 1fr;
		width: 100%;
		height: 100%;

		._title {
			padding: 16px;
			padding-bottom: 0;
			box-sizing: border-box;

			b {
				font-size: 1rem;
			}

			a {
				margin-left: 4px;
				color: #999;
				font-size: 0.875rem;
			}
		}

		._contain {
			padding: 10px 0;
			box-sizing: border-box;
		}
	}
</style>
