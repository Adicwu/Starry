import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import music from './modules/music'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loading: true
	},
	mutations: {},
	actions: {},
	modules: {
		user,
		music
	}
})
