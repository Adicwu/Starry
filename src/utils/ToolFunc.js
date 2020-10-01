export default {
	install(Vue, options) {
		window.debouncetimer = null
		window.throttleflag = true
		Object.assign(Vue.prototype, {
			getPresentDate() {
				let date = new Date();
				let year = date.getFullYear();
				let month = (date.getMonth() + 1).toString().padStart(2, '0');
				let day = (date.getDate()).toString().padStart(2, '0');
				let fulldate = year + "-" + month + "-" + day;
				return fulldate;
			},
			getFullPresentDate() {
				let date = new Date();
				let year = date.getFullYear();
				let month = (date.getMonth() + 1).toString().padStart(2, '0');
				let day = date
					.getDate()
					.toString()
					.padStart(2, '0');
				let hours = date
					.getHours()
					.toString()
					.padStart(2, '0');
				let mins = date
					.getMinutes()
					.toString()
					.padStart(2, '0');
				return year + '.' + month + '.' + day + ' ' + hours + ':' + mins;
			},
			toMainPage(path, id) {
				if (this.$route.path === path && this.$route.query.id === id) return;
				typeof id != 'undefined' ? this.$router.push(`${path}?id=${id}`) : this.$router.push(path)
			},
			debounce(fn, del = 300) {
				if (window.debouncetimer != null) clearTimeout(window.debouncetimer)
				window.debouncetimer = setTimeout(fn, del)
			},
			throttle(fn, del = 300) {
				if (!window.throttleflag) return;
				window.throttleflag = false
				setTimeout(() => {
					fn();
					window.throttleflag = true
				}, del)
			}
		})
	}
}
