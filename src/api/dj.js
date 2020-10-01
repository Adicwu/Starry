import {
	getax
} from './plugins/request.js'

//dj轮播
export function djBanner() {
	return getax('dj/banner')
}

//分类dj
export function rmdDj(type) {
	return getax(`dj/recommend/type?type=${type}`)
}

//dj分类列表
export function djTypes() {
	return getax('dj/catelist')
}

//dj节目
export function djProgram(id,limit=30){
	return getax(`dj/program?rid=${id}&limit=${limit}`)
}

//dj详情
export function djDetail(id){
	return getax(`dj/detail?rid=${id}`)
}

//dj节目评论
export function djComment(id){
	return getax(`comment/dj?id=${id}`)
}