import VueRouter from 'vue-router'
import Vue from 'vue'

const routerList = []
function importAll(routerArr) {
	routerArr.keys().forEach(key => {
		routerList.push(routerArr(key).default)
	})
}
importAll(require.context('./route', true, /\.routes\.js/))
Vue.use(VueRouter)

const routes = [{
		path: '/',
		component: () => import('../views/Home/Home'),
		meta: {
			title: 'Starry',
		}
	},
	// {
	// 	path: '*',
	// 	component: ,
	// 	meta: {
	// 		title: 'Starry'
	// 	},
	// },
	...routerList
]
const router = new VueRouter({
	mode: 'history',
	// mode: 'hash',
	routes,
})

router.beforeEach((to, from, next) => {
	next();
})
export default router
