import {
	songUrl,
	songDetail
} from 'apis/song';
import Vue from 'vue';
import {
	Toast
} from 'vant';
Vue.use(Toast);

let state_his = localStorage.getItem('music_his') ? JSON.parse(localStorage.getItem('music_his')) : {
	curindex: null,
	curlist: [],
	curlistid: 0,
	cururl: null,
	curMusicInfo: null,
},
	state_base = {
		volume: 0.6,
		eventflag: false,
		status: 0, //0暂停 1播放 2加载
		playerFlag: false,
	}
export default {
	state: {
		...state_his,
		...state_base,
		playhis: localStorage.getItem('play_his') ? JSON.parse(localStorage.getItem('play_his')) : []
	},
	getters: {
		curMusic(state) {
			return state.curlist[state.curindex]
		},
		isLastItem(state) {
			return state.curindex + 1 === state.curlist.length
		},
		isFirstItem(state) {
			return state.curindex === 0
		},
		hasCurlist(state) {
			return state.curlist.length != 0
		},
		curlistLength(state) {
			return state.curlist.length
		}
	},
	mutations: {
		changeCurlist(state, info) {
			state.curlist = info.list
			state.curlistid = info.id
		},
		changeCurindex(state, index) {
			state.curindex = index
		},
		changeCurUrl(state, url) {
			state.cururl = url
			this.commit('curPlay')
		},
		changeEventflag(state, flag) {
			state.eventflag = flag
		},
		changeCurMusicInfo(state, flag) {
			state.curMusicInfo = flag
		},
		changePlayerFlag(state, res) {
			state.playerFlag = res
		},
		addCurItem(state, info) {
			if (info === null) return;
			if (state.curlist.findIndex(item => item.id === info.id) === -1) {
				state.curlist.unshift(info)
			}
		},
		insertNextItem(state, info) {
			if (info === null) return;
			let key = state.curlist.findIndex(item => item.id === info.id)
			if (key === -1) {
				state.curlist.splice(state.curindex + 1, 0, info);
			} else {

			}
		},
		addHisItem(state, info) {
			if (info === null) return;
			if (state.playhis.findIndex(item => item.id === info.id) === -1) {
				state.playhis.push(info)
				localStorage.setItem('play_his', JSON.stringify(state.playhis))
			}
		},
		curPlay(state) {
			let dom = document.getElementById('myaudio')
			state.status = 0
			dom.oncanplay = e => {
				state.status = 1
				dom.play()
			}
		},
		musicPause(state) {
			state.status = 0
			document.getElementById('myaudio').pause()
		},
		musicPlay(state) {
			if (!this.getters.hasCurlist) return Toast('没有歌单');
			let dom = document.getElementById('myaudio')
			if (state.status === 0) {
				dom.play()
				state.status = 1
			} else {
				dom.pause()
				state.status = 0
			}
		},
		setMusicHis(state) {
			let his = {
				curindex: state.curindex,
				curlist: state.curlist,
				curlistid: state.curlistid,
				cururl: state.cururl,
				curMusicInfo: state.curMusicInfo
			}
			localStorage.setItem('music_his', JSON.stringify(his))
		},
		clearMusicHis(state) {
			localStorage.clear()
		}
	},
	actions: {
		changeCurMusic({
			state,
			dispatch,
			commit
		}, info) {
			let old_info = {
				...state
			};
			!state.eventflag && dispatch('autoNextMusic')
			if (info.id != null && state.curlistid != info.id) commit('changeCurlist', info);
			if (state.curindex != info.index || old_info.curlistid != info.id) {
				commit('changeCurindex', info.index);
				dispatch('getMusic').catch(err => {
					commit('changeCurindex', old_info.curindex)
					commit('changeCurlist', {
						list: old_info.curlist,
						id: old_info.curlistid
					})
				})
			} else {
				commit('musicPlay')
			}
		},
		getMusic({
			commit,
			getters
		}) {
			return new Promise((resolve, reject) => {
				let id = getters.curMusic.id;
				Promise.all([
					songUrl(id),
					songDetail(id)
				]).then(res => {
					let url = res[0].data.data[0].url
					commit('changeCurMusicInfo', res[1].data.songs[0])
					if (url != null) {
						commit('changeCurUrl', url)
						commit('setMusicHis')
						commit('addHisItem', getters.curMusic)
						resolve()
					} else {
						Toast('当前歌曲无版权')
						reject()
					}
				})
			})
		},
		nextMusic({
			state,
			dispatch,
			commit,
			getters
		}) {
			if (!getters.hasCurlist) {
				Toast('你和我，没有歌');
			} else if (getters.curlistLength === 1) {
				Toast('你和我，只有一首歌');
			} else {
				let index = getters.isLastItem ? 0 : state.curindex + 1
				commit('changeCurindex', index)
				dispatch('getMusic').catch(err => dispatch('nextMusic'))
			}
		},
		prevMusic({
			state,
			dispatch,
			commit,
			getters
		}) {
			if (!getters.hasCurlist) {
				Toast('你和我，没有歌');
			} else if (getters.curlistLength === 1) {
				Toast('你和我，只有一首歌');
			} else {
				let index = (getters.isFirstItem ? state.curlist.length : state.curindex) - 1
				commit('changeCurindex', index)
				dispatch('getMusic').catch(err => dispatch('prevMusic'))
			}
		},
		autoNextMusic({
			commit,
			getters,
			state,
			dispatch
		}) {
			let dom = document.getElementById('myaudio')
			commit('changeEventflag', true)
			dom.addEventListener('ended', e => dispatch('nextMusic'))
		},
		newMusic({
			commit,
			dispatch
		}, key) {
			let {
				info,
				obj
			} = key;
			return info || obj ? new Promise(resolve => {
				commit("addCurItem", info);
				dispatch("changeCurMusic", obj);
				resolve()
			}) : '';
		}
	},
}