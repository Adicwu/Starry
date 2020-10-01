import {
	logout
} from 'apis/user'
export default {
	state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
		flag: false,
		userid: null,
		token: null,
		cookie: null,
	},
	mutations: {
		setAccessToken(state, auth) {
			if (auth.token != state.token) {
				state.flag = auth.flag
				state.token = auth.token
				state.userid = auth.userid
				state.cookie = auth.cookie
			}
		},
		clearAccessToken(state) {
			sessionStorage.clear()
			location.reload()
		}
	},
	getters: {

	},
	actions: {
		signOut({commit}) {
			return new Promise(resolve => {
				logout().then(res => {
					commit('clearAccessToken')
					resolve()
				})
			})
		}
	},
}
