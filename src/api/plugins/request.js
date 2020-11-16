import axios from 'axios'
import { Toast } from 'vant'
const dev = false;

const baseURL = dev ? '/api' : 'https://musicapi.adicw.cn/',
	timeout = 6000;
axios.defaults.withCredentials = true
const instance = axios.create({
	baseURL,
	timeout,
})
instance.interceptors.response.use(response => {
	return response
}, error => {
	let { status, data } = error.response
	switch (status) {
		case 404: {
			Toast(data.message || '!!!');
			break;
		}
	}
	return Promise.reject(error)
})
// instance.interceptors.request.use(config => {
// 	if (store.state.user.token == null) {
// 		router.push('/login')
// 	} else {
// 		let { cookie } = store.state.user
// 		config.withCredentials = true
// 		config.header.cookie = cookie
// 	}
// 	return config
// }, err => {
// 	console.dir(err);
// 	return Promise.reject(err)
// })

export function getax(config) {
	return instance(config)
}

export function postax(url, data = {}) {
	return instance.post(url, data)
}

export function putax(url, data = {}) {
	return instance.put(url, data)
}