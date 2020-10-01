import {
    throttle,
    debounce
} from 'lodash'
import Vue from 'vue'
export const throttles = function (wait = 300, options = {}) {
    return function (target, name, descriptor) {
        descriptor.value = throttle(descriptor.value, wait, options)
    }
}
export const debounces = function (wait = 300, options = {}) {
    return function (target, name, descriptor) {
        descriptor.value = debounce(descriptor.value, wait, options)
    }
}
export const adConfirm = function (text) {
    const {
        $aconfirm
    } = Vue.prototype;
    return function (target, name, descriptor) {
        let originFn = descriptor.value;
        descriptor.value = function (...args) {
            $aconfirm(text)
                .then(originFn.bind(this, ...args))
                .catch(() => {});
        }
    }
}