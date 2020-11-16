import Vue from 'vue'
import LoadingBlock from '../common/LoadingBlock.vue'
const Mask = Vue.extend(LoadingBlock)
function insertDom(parent, el, binding) {
    el.instance.visible = true;
    parent.appendChild(el.mask)
}
function removeDom(rootDom, el, binding) {
    if (!binding.value) {
        rootDom.removeChild(el.mask)
        el.instance && el.instance.$destroy();
    }
}
const directive = () => {
    Vue.directive('loading', {
        bind(el, binding) {
            const mask = new Mask({
                el: document.createElement('div'),
                data: {}
            });
            el.instance = mask
            el.mask = mask.$el
            el.oldValue = binding.value
            el.isOver = false
            if (binding.value) {
                Vue.nextTick(() => {
                    el.oldDisplay = el.style.display
                    el.style.display = 'none';
                    el.rootDom = typeof binding.modifiers.child === 'undefined' ? el.parentElement : el;
                    insertDom(el.rootDom, el, binding)
                })
            }
        },
        update(el, binding) {
            if (el.oldValue !== binding.value && !el.isOver) {
                el.isOver = true
                removeDom(el.rootDom, el, binding)
                el.style.display = el.oldDisplay;
            }
        },
        unbind(el) {
            el.instance && el.instance.$destroy();
        }
    })
};
export default directive;