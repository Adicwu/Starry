import {
	getax,
	postax
} from './plugins/request.js'
import {
	getCookie
} from './plugins/mixin.js'

//推荐视频
export function rmdVideo(offset = 0) {
	return getax(`video/timeline/recommend?offset=${offset}`)
}

//全部视频列表
export function videoLists(offset = 0) {
	return getax(`video/timeline/all?offset=${offset}`)
}

//标签/分类视频
export function groupVideo(id, offset = 0) {
	return getax(`video/group?id=${id}offset=${offset}`)
}

//视频分类列表
export function videoCateLists() {
	return getax(`video/category/list`)
}

//视频标签列表
export function videoGroupLists() {
	return getax(`video/group/list`)
}

//视频详情
export function videoDetail(id) {
	return getax(`video/detail?id=${id}`)
}

//视频相关数据
export function videoInfo(id) {
	return getax(`video/detail/info?id=${id}`)
}

//视频播放地址
export function videoUrl(id) {
	return getax(`video/url?id=${id}`)
}

//视频评论
export function videoComment(id, limit = 5, offset = 0) {
	return getax(`comment/video?id=${id}&limit=${limit}&offset=${offset}`)
}

//云盘
export function cloud(limit = 200, offset = 0) {
	return getax(`user/cloud?limit=${limit}&offset=${offset}`)
}