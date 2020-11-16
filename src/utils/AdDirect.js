const AdDirect = {};
AdDirect.install = (Vue, options = {}) => {
	Vue.directive('scrollTop', {
		bind(el, binding) {
			let bool = true
			el.scorlltop = e => {
				if (!bool) return;
				bool = false
				setTimeout(() => {
					let scrollTop = e.target.scrollTop;
					scrollTop === 0 ? binding.value(true) : binding.value(false)
					bool = true
				}, 100)
			}
			el.addEventListener('scroll', el.scorlltop)
		},
		unbind(el) {
			el.removeEventListener('scroll', el.scorlltop)
			delete el.scorlltop
		}
	})
	Vue.directive('scrollBottom', {
		bind(el, binding) {
			let eventAction = true,
				bool = true
			el.scorllbottom = e => {
				if (!bool) return;
				bool = false
				setTimeout(() => {
					let scrollTop = e.target.scrollTop;
					let eHeight = e.target.offsetHeight;
					let sHeight = e.target.scrollHeight;
					if (scrollTop + eHeight === sHeight && eventAction) {
						binding.value()
						eventAction = false
					} else {
						eventAction = true
					}
					bool = true
				}, 100)
			}
			el.addEventListener('scroll', el.scorllbottom)
		},
		unbind(el) {
			el.removeEventListener('scroll', el.scorllbottom)
			delete el.scorllbottom
		}
	})
	Vue.directive('lazyload', {
		bind(el, binding) {
			let eventAction = true,
				bool = true
			el.scorllbottom = e => {
				if (!bool) return;
				bool = false
				setTimeout(() => {
					let scrollTop = e.target.scrollTop;
					let eHeight = e.target.offsetHeight;
					let sHeight = e.target.scrollHeight;
					if (scrollTop + eHeight + 100 >= sHeight && eventAction) {
						binding.value()
						eventAction = false
					} else {
						eventAction = true
					}
					bool = true
				}, 60)
			}
			el.addEventListener('scroll', el.scorllbottom)
		},
		unbind(el) {
			el.removeEventListener('scroll', el.scorllbottom)
			delete el.scorllbottom
		}
	})
	Vue.directive('imgLazyload', {
		bind(el, binding) {
			el.url = el.src;
			el.src = '';
			el.style.opacity = 0;
			el.lazyImageObserver = new IntersectionObserver((entries, observer) => {
				if (entries[0].intersectionRatio > 0 || entries[1] && entries[1].intersectionRatio > 0) {
					const image = new Image();
					image.src = el.url;
					image.onload = function () {
						el.src = el.url;
						el.style.opacity = 1;
					}
				}
			});
			el.lazyImageObserver.observe(el);
		},
		unbind(el) {
			el.lazyImageObserver.unobserve(el);
			el.url = el.lazyImageObserver = null;
		}
	})
	Vue.directive('press', {
		bind(el, binding) {
			let timer = ''
			el.touchstart = e => {
				(timer != '') && clearTimeout(timer);
				timer = setTimeout(binding.value, 400);
			}
			el.touchmove = e => {
				(timer != '') && clearTimeout(timer);
				timer = ''
			}
			el.touchend = e => (timer != '') && clearTimeout(timer);
			el.addEventListener('touchstart', el.touchstart)
			el.addEventListener('touchmove', el.touchmove)
			el.addEventListener('touchend', el.touchend)
		},
		unbind(el) {
			el.removeEventListener('touchstart', el.touchstart)
			el.removeEventListener('touchmove', el.touchmove)
			el.removeEventListener('touchend', el.touchend)
			delete el.touchstart
			delete el.touchmove
			delete el.touchend
		}
	})
	Vue.directive('focus', {
		inserted(el) {
			el.focus()
		},
	})
	Vue.directive('clickOutside', {
		bind(el, binding) {
			el.clickoutside = e => {
				if (el.contains(e.target)) return false
				if (binding.expression) binding.value(e)
			}
			document.addEventListener('click', el.clickoutside)
		},
		unbind(el) {
			document.removeEventListener('click', el.clickoutside)
			delete el.clickoutside
		}
	})
	Vue.directive('preventBack', {
		bind(el, binding) {
			el.preventBack = binding.value
			if (window.history.state != 'dfBreak') {
				window.history.pushState('dfBreak', null, null)
			}
			window.addEventListener('popstate', el.preventBack)
		},
		unbind(el) {
			window.removeEventListener('popstate', el.preventBack)
			delete el.preventBack
		}
	})
	Vue.directive('nextInput', {
		bind(el, binding) {
			el.nextInput = e => {
				let input_list = e.target.parentNode.parentNode.querySelectorAll('input[type=text],input[type=password]')
				let index = Array.from(input_list).findIndex(item => item == e.target)
				if (typeof input_list[index + 1] === 'undefined') return;
				el.onkeypress = function (e) {
					let eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
					eCode == 13 && input_list[index + 1].focus()
				}
			}
			el.addEventListener('focus', el.nextInput)
		},
		unbind(el) {
			el.removeEventListener('focus', el.nextInput)
			delete el.nextInput
		}
	})
	Vue.directive('imgLoader', {
		bind(el, binding) {
			el.newImg = new Image()
			el.style.display = 'none';
			el.newImg.src = el.src
			el.newImg.onload = e => el.style.display = 'unset';
		},
		unbind(el) {
			el.newImg = null
		}
	})
};
export default AdDirect;
