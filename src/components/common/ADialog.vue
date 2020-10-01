<template>
	<transition enter-active-class="fadeIn" leave-active-class="fadeOut">
		<div id="adialog" v-if="visible" @click.self="handleAction('no')">
			<div class="adialog-contain">
				<p class="adialog-contain-title">提示</p>
				<div class="adialog-contain-msg">{{ content }}</div>
				<div class="adialog-contain-btngroup">
					<input type="button" value="取消" @click="handleAction('no')" />
					<input type="button" value="确定" @click="handleAction('yes')" />
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'adialog',
	data() {
		return {
			visible: false,
			content: '',
			promiseStatus: null
		};
	},
	mounted() {
		window.history.pushState(null, null, document.URL);
		window.onpopstate = this.handleAction.bind(null, 'no');
	},
	methods: {
		confirm() {
			let _this = this;
			this.visible = true;
			return new Promise(function(resolve, reject) {
				_this.promiseStatus = {
					resolve,
					reject
				};
			});
		},
		handleAction(action) {
			this.visible = false;
			if (action == 'yes') {
				this.promiseStatus && this.promiseStatus.resolve();
			} else {
				// this.promiseStatus && this.promiseStatus.reject();
			}
		}
	}
};
</script>

<style lang="less">
#adialog {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 9999;
	animation-duration: 0.3s;
	.adialog-contain {
		position: relative;
		width: 100%;
		height: 150px;
		background-color: #fff;
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
		overflow: hidden;
		animation: 0.3s adlogconanm forwards;
		user-select: none;
		@keyframes adlogconanm {
			from {
				transform: translateY(-80px);
			}
			to {
				transform: translateY(0);
			}
		}
		.adialog-contain-title {
			display: flex;
			width: 100%;
			height: 30px;
			justify-content: center;
			align-items: center;
			font-size: 0.875rem;
			color: #666;
		}
		.adialog-contain-msg {
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: calc(100% - 76px);
			padding: 16px;
			font-size: 0.9375rem;
			color: #555;
		}
		.adialog-contain-btngroup {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 46px;
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr;
			border-top: 1px solid #eee;
			& > input[type='button'] {
				box-sizing: border-box;
				background: none;
				border: none;
				outline: none;
				font-size: 0.875rem;
				&:active {
					background: rgba(0, 0, 0, 0.1);
				}
			}
			& > input[value='取消'] {
				color: #555;
			}
			& > input[value='确定'] {
				color: #f05671;
				border-left: 1px solid #eee;
			}
		}
	}
}
</style>
