import {
	getax
} from './plugins/request.js'

//推荐新歌
export function rmdNewsSong() {
	return getax(`personalized/newsong`)
}

//歌单内容
export function songlistDetail(id) {
	return getax(`playlist/detail?id=${id}`)
}

//歌曲内容
export function songDetail(id) {
	return getax(`song/detail?ids=${id}`, false)
}

//获取音乐url
export function songUrl(id) {
	return getax(`song/url?id=${id}`, false)
}

//获取音乐歌词
export function songLyric(id) {
	return getax(`lyric?id=${id}`, false)
}

//单曲是否可用
export function songCheck(id) {
	return getax(`check/music?id=${id}`, false)
}

//获取歌曲评论
export function songComment(id, limit = 20, offset = 0, before = 0) {
	return getax(`comment/music?id=${id}&limit=${limit}&offset=${offset}`)
}
