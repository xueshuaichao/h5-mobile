import { Toast } from 'vant';

export default {
    install(Vue) {
        Vue.prototype.$loading = (message = '') => {
            Toast.loading({ forbidClick: true, message, duration: 0 })
        }
    }
}
