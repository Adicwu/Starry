<template>
	<div class="date-picker-list" @click="handler" ref="contain">
		<label for="">{{ title }}</label>
		<p>{{ curText }}</p>
		<MovableMask get-container="#app" position="bottom" v-model="calendar.flag" v-prevent-back="close">
			<van-datetime-picker
				v-model="calendar.val"
				style="width: 100%;"
				type="date"
				title="选择年月日"
				:min-date="calendar.minDate"
				:max-date="calendar.maxDate"
				@confirm="onConfirm"
			/>
		</MovableMask>
	</div>
</template>

<script>
import Vue from 'vue';
import MovableMask from '../common/MovableMask';
export default {
	name: 'datepickerlist',
	components: {
		MovableMask
	},
	props: {
		title: String,
		value: Number
	},
	data() {
		return {
			calendar: {
				flag: false,
				val: new Date(),
				minDate: new Date(1800, 0, 1),
				maxDate: new Date()
			}
		};
	},
	computed: {
		curText() {
			let date = new Date(this.value);
			return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		}
	},
	methods: {
		onConfirm(val) {
			this.calendar.flag = false;
			this.$emit('input', new Date(val).getTime());
		},
		handler() {
			this.calendar.flag = true;
			this.calendar.val = new Date(this.value);
		},
		close(){
			this.calendar.flag = false;
		}
	}
};
</script>

<style lang="less" scoped>
.date-picker-list {
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
		width: 100%;
		height: 100%;
		text-align: right;
		color: #777;
		font-size: 14px;
	}
}
</style>
