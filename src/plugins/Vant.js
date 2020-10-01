import 'vant/lib/index.css';
import Vue from 'vue'
const list = [
	Popup,
	Overlay,
	Icon,
	Slider,
	Button,
	Swipe,
	SwipeItem,
	Notify,
	Toast,
	Tab,
	Tabs,
	Field,
	ShareSheet,
	ImagePreview,
	Loading,
	Empty,
	PullRefresh,
	Circle,
	Sticky,
	NoticeBar,
	DatetimePicker,
	Area,
]
import {
	Popup,
	Overlay,
	Icon,
	Slider,
	Button,
	Swipe,
	SwipeItem,
	Notify,
	Toast,
	Tab,
	Tabs,
	Field,
	ShareSheet,
	ImagePreview,
	Loading,
	Empty,
	PullRefresh,
	Circle,
	Sticky,
	NoticeBar,
	DatetimePicker,
	Area,
} from 'vant'
list.forEach(item => {
	let no_list = [];
	!no_list.includes(item) && Vue.use(item)
})
