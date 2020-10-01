import {
	getax
} from './plugins/request.js'
//歌手mv
export function singerMv(id, limit = 50) {
	return getax(`artist/mv?id=${id}&limit=${limit}`)
}
//歌手专辑
export function singerAlbums(id, limit = 40) {
	return getax(`artist/album?id=${id}&limit=${limit}`)
}
//专辑内容
export function singerAlbum(id) {
	return getax(`album?id=${id}`)
}
//歌手描述
export function singerDesc(id) {
	return getax(`artist/desc?id=${id}`)
}
//歌手热门50单曲
export function singerHotArtists(id) {
	return getax(`artist/top/song?id=${id}`)
}
//歌手单曲
export function singerArtists(id) {
	return getax(`artists?id=${id}`)
}
//相似歌手
export function singerSimi(id) {
	return getax(`/simi/artist?id=${id}`)
}
