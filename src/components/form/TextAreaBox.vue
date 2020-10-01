<template>
	<div class="textarea-box">
		<van-field v-bind="this.$attrs" v-model="val" />
		<div class="_handler">
			<input type="button" value="取消" @click="handler(false)" />
			<input type="button" value="确定" @click="handler(true)" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'textareabox',
	props:{
		value: String
	},
	data(){
		return{
			val: ''
		}
	},
	watch:{
		value:{
			immediate:true,
			handler(val){
				this.val = val
			}
		}
	},
	methods: {
		handler(flag) {
			flag ? this.$emit('define', this.val) : this.$emit('cancle');
		}
	}
};
</script>

<style scoped lang="less">
.textarea-box {
	width: 90%;
	border-radius: 8px;
	background: #fff;
	overflow: hidden;
	._handler {
		width: 100%;
		height: 34px;
		display: flex;
		input {
			flex: 1;
			background: none;
			border: none;
			outline: none;
			font-size: 14px;
			&:active {
				background: rgba(0, 0, 0, 0.2);
			}
			&:first-child {
				border-right: 1px solid #eee;
				box-sizing: border-box;
			}
		}
	}
}
</style>
