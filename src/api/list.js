import {
	getax
} from './plugins/request.js'

//精品歌单
export function boutiqueAudioList(cat = '',limit, before = 0) {
	// " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部"
	return before === 0 ?
		getax(`/top/playlist/highquality?limit=${limit}&cat=${cat}`) :
		getax(`/top/playlist/highquality?limit=${limit}&before=${before}&cat=${cat}`)
}

//推荐歌单
export function rmdSonglist(limit = 1) {
	return getax(`personalized?limit=${limit}`)
}

//热门歌单
export function hotSonglist() {
	return getax('playlist/hot')
}

//网友精选歌单
export function userHotSonglist(limit, offset = 0, order = '', cat = '') {
	return getax(`top/playlist?limit=${limit}&offset=${offset}&order=${order}&cat=${cat}`)
}
