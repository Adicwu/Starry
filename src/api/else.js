import {
	getax
} from './plugins/request.js'
import {
	songUrl
} from './song.js'
export function getBanner() {
	return getax('banner?type=1')
}
export function exclusiveBroadcast() {
	return getax('personalized/privatecontent')
}
export function rmdRadiostation() {
	return getax('personalized/djprogram')
}
export function mvTop(limit) {
	return getax(`top/mv?limit=${limit}`)
}
export function hotComment(id, type, limit = 10, offset = 0) {
	// 0: 歌曲 1: mv 2: 歌单  3: 专辑 4: 电台 5: 视频
	return getax(`comment/hot?id=${id}&type=${type}&limit=${limit}&offset=${offset}`)
}
//相关列表(电台、歌单)
export function relatedList(id) {
	return getax(`related/playlist?id=${id}`)
}
//默认搜索关键词
export function dfSearchTxt() {
	return getax(`search/default`)
}
//热搜列表(简略)
export function tinyHotSearch() {
	return getax(`search/hot`)
}
//热搜列表(详细)
export function fullHotSearch() {
	return getax(`search/hot/detail`)
}

//混合关键字搜索
//type 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
export function mixSearch(key, type = 1, limit = 40, offset = 0) {
	if (type === 1) {
		return new Promise((resolve, reject) => {
			getax(`search?keywords=${key}&limit=${limit}&type=${type}&offset=${offset}`).then(res => {
				let songs = res.data.result.songs
				let songCount = res.data.result.songCount
				let ids = songs.map(item => item.id)
				songUrl(ids.toString()).then(respon => {
					respon.data.data.forEach(rel => {
						let index = songs.findIndex(item => item.id === rel.id)
						songs[index].url = rel.url
					})
				})
				let rel = {
					songs,
					songCount
				}
				resolve(rel)
			}).catch(err => reject(err))
		})
	} else {
		return getax(`search?keywords=${key}&limit=${limit}&type=${type}&offset=${offset}`)
	}
}

//搜索提示
export function searchSuggest(keywords) {
	return getax(`search/suggest?keywords= ${keywords}&type=mobile`)
}