import Vue from 'vue'
const filters = {
	numFormat(val) {
		val = val.toString();
		return val.length > 4 ? `${val.substr(0, val.length - 4)}万` : val;
	},
	msToYmd(val) {
		let date = new Date(val)
		return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
	},
}
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
