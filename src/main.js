import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.prototype.$Qs = Qs;

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.config.productionTip = false;

axios.interceptors.request.use(function (config) {
    let data = config.data;
    let params = new URLSearchParams();
    for (var key in config.data) {
        params.append(key, data[key]);
    }
    config.data = params;
    return config;
}, function (error) {
    return Promise.reject(error);
});

//axios.interceptors.request.use(config => {
//    console.log(config)
//    config.headers.session = window.sessionStorage.getItem('token')
//    return config
//})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
