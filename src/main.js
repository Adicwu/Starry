//default
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

//plugins
import '@/plugins/Vant'
import '@/plugins/GlobalComps'
import '@/plugins/ADialog'
import '@/utils/Filters'
import ToolFunc from '@/utils/ToolFunc'
import AdDirect from '@/utils/AdDirect'
import LoadingBlock from '@/components/utils/LoadingBlock'
import Bus from '@/utils/Bus'
Vue.use(AdDirect)
Vue.use(ToolFunc)
Vue.use(Bus)
Vue.use(LoadingBlock)


//axios
Vue.prototype.axios = axios
axios.defaults.withCredentials = true
//vuex
Vue.prototype.$store = store
//else
Vue.prototype.baseImg = 'https://api.adicw.cn/uploads/';
Vue.prototype.squareImgSize = '?param=300y300';
Vue.prototype.rectangleImgSize = '?param=533y300';
Vue.prototype.dfImg = 'http://p1.music.126.net/Vxsf58sMyNjqnWVZa9Wbfw==/18991864347187831.jpg';
Vue.config.productionTip = false

//router
new Vue({
	render: h => h(App),
	router,
}).$mount('#app')