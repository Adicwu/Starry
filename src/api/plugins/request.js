import axios from 'axios'
import store from '../../store/index.js'

const baseurl = 'https://musicapi.adicw.cn/',
	timeout = 6000;
axios.defaults.withCredentials = true
const ITCPT = {
	requester(instance) {
		instance.interceptors.request.use(config => {
			if (store.state.user.token == null) {
				router.push('/login')
			} else {
				let { cookie } = store.state.user
				config.withCredentials = true
				config.header.cookie = cookie
			}
			return config
		}, err => {
			return Promise.reject(err)
		})
	},
	responser(instance) {
		// store.state.loading = false
		instance.interceptors.response.use(response => {
			// store.state.loading = true
			return response
		}, error => {
			// store.state.loading = true
			return Promise.reject(error)
		})
	}
}
export function Crossax(config) {
	const instance = axios.create({
		baseURL: '/api',
		timeout,
	})
	return instance(config)
}

export function getax(config, istrans = true) {
	const instance = axios.create({
		baseURL: baseurl,
		timeout,
	})
	istrans && ITCPT.responser(instance)
	return instance(config)
}

export function postax(url, data = {}) {
	const instance = axios.create({
		baseURL: baseurl,
		timeout,
	})
	ITCPT.responser(instance)
	return instance.post(url, data)
}

export function putax(url, data = {}) {
	const instance = axios.create({
		baseURL: baseurl,
		timeout
	})
	ITCPT.responser(instance)
	return instance.put(url, data)
}