import store from '../../store/index.js'
export function getCookie(){
    let {
		cookie
    } = store.state.user;
    return cookie;
}