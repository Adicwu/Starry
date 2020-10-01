const Home = () => import('@/views/Home/Home')
// const SongSearch = () => import('@/views/Song/SongSearch')
const HomeSearch = () => import('@/views/Home/routes/HomeSearch')


const MvDetail = () => import('@/views/Video/MvDetail')
const DjDetail = () => import('@/views/Dj/DjDetail')
const SongDetail = () => import('@/views/Song/SongDetail')
const SingerDetail = () => import('@/views/Singer/SingerDetail')
const VideoDetail = () => import('@/views/Video/VideoDetail')

const SonglistSquare = () => import('@/views/Square/SonglistSquare')
const MvSquare = () => import('@/views/Square/MvSquare')
const DjSquare = () => import('@/views/Square/DjSquare')

const SingerAlbum = () => import('@/views/Singer/routes/SingerAlbum')

const UserDetail = () => import('@/views/User/UserDetail')
const UserSonglist = () => import('@/views/User/routes/UserSonglist')
const UserInfo = () => import('@/views/User/routes/UserInfo')
const UsetTrendDetail = () => import('@/views/User/routes/UsetTrendDetail')
const UserNews = () => import('@/views/User/UserNews')
const UserChatroom = () => import('@/views/User/UserChatroom')
const UserFriend = () => import('@/views/User/UserFriend')

const Details = [{
		path: 'songdetail',
		component: SongDetail,
		meta: {
			title: '歌单 - Starry'
		},
	},
	{
		path: 'mvdetail',
		component: MvDetail,
		meta: {
			title: 'Mv - Starry'
		},
	},
	{
		path: 'videodetail',
		name: 'VideoDetail',
		component: VideoDetail,
		meta: {
			title: '视频 - Starry'
		},
	},
	{
		path: 'userdetail',
		component: UserDetail,
		meta: {
			title: '用户 - Starry'
		},
		children: [{
				path: 'usersonglist',
				component: UserSonglist,
				meta: {
					title: '用户歌单 - Starry'
				},
			},
			{
				path: 'userinfo',
				component: UserInfo,
				meta: {
					title: '我的资料 - Starry'
				},
			},
			{
				path: 'trenddetail',
				component: UsetTrendDetail,
				meta: {
					title: '动态详情 - Starry'
				},
			}

		]
	},
	{
		path: 'singerdetail',
		component: SingerDetail,
		meta: {
			title: '歌手 - Starry'
		},
	},
	{
		path: 'djdetail',
		component: DjDetail,
		meta: {
			title: '电台 - Starry'
		},
	},
];
const Squares = [{
		path: 'songltsquare',
		component: SonglistSquare,
		meta: {
			title: '歌单广场 - Starry'
		},
	},
	{
		path: 'mvsquare',
		component: MvSquare,
		meta: {
			title: 'Mv广场 - Starry'
		},
	},
	{
		path: 'djsquare',
		component: DjSquare,
		meta: {
			title: '电台广场 - Starry'
		},
	},
];
export default {
	path: '/home',
	component: Home,
	meta: {
		title: '首页 - Starry'
	},
	children: [
		...Details,
		...Squares,
		{
			path: 'search',
			component: HomeSearch,
			meta: {
				title: '混合搜索 - Starry'
			},
		},
		{
			path: 'usernews',
			component: UserNews,
			meta: {
				title: '用户消息 - Starry'
			},
		},
		{
			path: 'userfriend',
			component: UserFriend,
			meta: {
				title: '用户好友 - Starry'
			},
		},
		{
			path: 'userchatroom',
			component: UserChatroom,
			meta: {
				title: '消息室 - Starry'
			},
		},
		{
			path: 'singeralbum',
			component: SingerAlbum,
			meta: {
				title: '专辑 - Starry'
			},
		},
	]
}