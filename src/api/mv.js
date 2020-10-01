import {
	getax
} from './plugins/request.js'

//最新mv
export function newMv(limit) {
	return getax(`/mv/first?limit=${limit}`, false)
}

//推荐mv
export function rmdMv(limit) {
	return getax('/personalized/mv')
}

//排行mv
export function rankMv(limit, area = '') {
	return getax(`/top/mv?limit=${limit}&area=${area}`)
}

//获取mv数据
export function mvDetail(id) {
	return Promise.all([
		getax(`mv/detail?mvid=${id}`),
		getax(`mv/url?id=${id}`),
		getax(`mv/detail/info?mvid=${id}`),
	])
}

//获取mv相关视频数据
export function mvRelated(id) {
	return getax(`related/allvideo?id=${id}`)
}

//获取视频标签/分类下的视频
export function mvGroup(id){
	return getax(`video/group?id=${id}`)
}

//获取mv评论内容
export function mvComment(id,limit=5) {
	return getax(`comment/mv?id=${id}&limit=${limit}`)
}
