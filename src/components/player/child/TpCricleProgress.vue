<template>
	<div class="_cricle-progress"><canvas class="canvas-bar" ref="canvasbar" /></div>
</template>
<script>
export default {
	name: 'tpcricleprogress',
	methods: {
		canvasInit() {
			var c = this.$refs.canvasbar;
			var ctx = c.getContext('2d');
			var audio = this.$parent.$refs.myaudio;
			var mW = (c.width = 300);
			var mH = (c.height = 300);
			var lineWidth = 6;
			var r = mW / 2;
			var cR = 140;
			var startAngle = 0;
			var endAngle = startAngle + 1.5 * Math.PI;
			var xAngle = 1 * (Math.PI / 180);
			var tmpAngle = startAngle;
			(function() {
				if (tmpAngle >= endAngle) {
					return;
				} else if (tmpAngle + xAngle > endAngle) {
					tmpAngle = endAngle;
				} else {
					let mag = audio.currentTime / audio.duration;
					tmpAngle = endAngle * mag;
				}
				ctx.clearRect(0, 0, mW, mH);
				ctx.beginPath();
				ctx.lineWidth = lineWidth;
				var gradient = ctx.createLinearGradient(0, 0, 300, 0);
				gradient.addColorStop('0', '#68F9E4');
				gradient.addColorStop('1.0', '#0BDFEC');
				ctx.strokeStyle = gradient;
				ctx.shadowBlur = 6;
				ctx.shadowColor = '#0BDFEC';
				ctx.arc(r, r, cR, startAngle, tmpAngle);
				ctx.stroke();
				ctx.closePath();
			})();
		}
	}
};
</script>
<style lang="less" scoped>
._cricle-progress {
	position: absolute;
	top: 20px;
	left: 0;
	right: 0;
	margin: auto;
	width: 300px;
	height: 246px;
	overflow: hidden;
	&::after {
		content: '';
		position: absolute;
		top: 7px;
		left: 50%;
		transform: translateX(-50%);
		width: 285px;
		height: 285px;
		box-sizing: border-box;
		border: 6px solid rgba(0, 0, 0, 0.2);
		z-index: -1;
		border-radius: 50%;
	}
	.canvas-bar {
		z-index: 2;
		transform: rotate(135deg);
	}
}
</style>
