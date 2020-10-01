import {
	getax
} from './plugins/request.js'

//歌手信息以及单曲
export function artists(id) {
	return getax(`artists?id=${id}`)
}
