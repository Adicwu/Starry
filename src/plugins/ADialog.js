import Vue from 'vue'
import Confirm from '@/components/common/ADialog'
const ConfirmBox = Vue.extend(Confirm);
Confirm.install = (content, options) => {
	options = Object.assign({
		content: content,
	}, options);
	let instance = new ConfirmBox({
		data: options
	}).$mount();
	document.body.appendChild(instance.$el);
	return instance.confirm();
};
Vue.prototype.$aconfirm = Confirm.install;