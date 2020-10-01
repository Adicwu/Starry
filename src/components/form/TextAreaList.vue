<template>
	<div class="textarea-list" @click="textarea.flag = true">
		<label for="">{{ title }}</label>
		<p>{{ value }}</p>
		<MovableMask class="_mask" get-container="#app" v-model="textarea.flag" v-prevent-back="onCancle">
			<TextAreaBox
				v-model="value"
				rows="3"
				:autosize="textarea.size"
				clickable
				autofocus
				maxlength="200"
				show-word-limit
				type="textarea"
				@define="onDefine"
				@cancle="onCancle"
			/>
		</MovableMask>
	</div>
</template>

<script>
import MovableMask from '../common/MovableMask';
import TextAreaBox from './TextAreaBox';
export default {
	name: 'textarealist',
	components: {
		MovableMask,
		TextAreaBox
	},
	props: {
		title: String,
		value: String
	},
	data() {
		return {
			textarea: {
				flag: false,
				val: '',
				size: {
					maxHeight: 300
				}
			}
		};
	},
	methods: {
		onDefine(val){
			this.textarea.flag = false;
			this.$emit('input',val)
		},
		onCancle(){
			this.textarea.flag = false
		}
	}
};
</script>
<style lang="less" scoped>
.textarea-list {
	position: relative;
	display: grid;
	grid-template-columns: 120px 1fr;
	box-sizing: border-box;
	padding: 16px;
	width: 100%;
	&:active {
		background: rgba(0, 0, 0, 0.1);
	}
	&::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 16px;
		display: block;
		width: calc(100% - 16px);
		height: 1px;
		background: #e6e6e6;
		transform: scaleY(0.5);
	}
	label {
		align-self: center;
	}
	p {
		display: block;
		width: 100%;
		height: 100%;
		border: none;
		text-align: right;
		color: #777;
		font-size: 14px;
	}
}
</style>
