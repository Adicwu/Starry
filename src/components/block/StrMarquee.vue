<template>
	<div class="str-marquee">
		<div class="span1-anm">{{text}}</div>
		<div class="span1-anm">{{text}}</div>
	</div>
</template>

<script>
export default {
	name: 'strmarquee',
	props: {
		text: String,
		interval: {
			type: Number,
			default: 500
		}
	},
	data() {
		return {
		};
	},
	watch: {
		
	},
	mounted() {
		
	},
	methods: {}
};
</script>

<style lang="less" scoped>
.str-marquee {
	box-sizing: border-box;
	padding: 0 16px;
	width: 100%;
	height: 20px;
	overflow: hidden;
	white-space: nowrap;
	&>div{
		display: inline-block;
		&:nth-child(2){
			margin-left: 10px;
		}
	}
	.span1-anm{
		animation: spananm 4s infinite linear;
	}
	.span2-anm{
		
	}
	@keyframes spananm{
		from{
			transform: translateX(0)
		}
		to{
			transform: translateX(-110%)
		}
	}
}
</style>
