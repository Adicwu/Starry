import {
	getax,
	postax
} from './plugins/request.js'
import {
	getCookie
} from './plugins/mixin.js'

export function login(key) {
	return postax('login/cellphone', key)
}

export function logout() {
	return getax('logout')
}

export function loginStatus() {
	return getax('login/status')
}

export function loginRefresh() {
	return getax('login/refresh')
}

export function userDetail(id) {
	return getax(`user/detail?uid=${id}`)
}

//修改用户资料
export function userUpdate(key) {
	return postax('user/update', {
		...key,
	})
}

//用户歌单
export function userPlaylist(id) {
	return getax(`user/playlist?uid=${id}`)
}

//用户信息 , 歌单，收藏，mv, dj 数量
export function userSubcount() {
	return getax(`user/subcount?cookie=${getCookie()}`)
}

//用户动态
export function userEvent(id, limit = 30, lasttime = -1) {
	return getax(`user/event?uid=${id}&limit=${limit}&lasttime=${lasttime}`)
}

//用户消息
export function mixNews(pagesize = 30, lasttime = -1) {
	return getax(`event?pagesize=${pagesize}&lasttime=${lasttime}&cookie=${getCookie()}`)
}

//用户关注列表
export function userFollows(uid, limit = 30, offset = 0) {
	return getax(`user/follows?uid=${uid}&limit=${limit}&offset =${offset }`)
}

//用户粉丝列表
export function userFolloweds(uid, limit = 30, lasttime = -1) {
	return getax(`user/followeds?uid=${uid}&limit=${limit}&lasttime=${lasttime}&cookie=${getCookie()}`)
}

//用户歌手列表
export function userAartistSub() {
	return getax(`artist/sublist?&cookie=${getCookie()}`)
}

//喜欢列表
export function userLikelist(id) {
	return getax(`likelist?uid=${id}&cookie=${getCookie()}`)
}

//私人fm
export function personalFm() {
	return getax(`personal_fm`)
}

export function songLikeHandler(id, like) {
	return getax(`like/?id=${id}&like=${like}`)
}

export function eventChat(threadId) {
	return getax(`comment/event?threadId=${threadId}`)
}

// 通知 - 私信
export function privateMsg(limit = 30, offset = 0) {
	return getax(`msg/private?limit=${limit}&offset=${offset}&cookie=${getCookie()}`)
}

// 通知 - 评论
export function commentsMsg(uid, limit = 30, before = 0) {
	return getax(`msg/comments?uid=${uid}&limit=${limit}&before=${before}&cookie=${getCookie()}`)
}

// 通知 - @我
export function forwardsMsg(limit = 30, offset = 0) {
	return getax(`msg/forwards?limit=${limit}&offset=${offset}&cookie=${getCookie()}`)
}

// 通知 - 通知
export function noticesMsg(limit = 30, lasttime = -1) {
	return getax(`msg/notices?limit=${limit}&lasttime=${lasttime}&cookie=${getCookie()}`)
}