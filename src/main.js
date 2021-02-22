
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'


Vue.config.productionTip = false

//引入css
import './assets/css/normalize.css'
import './assets/css/common.css'
import store from './store'

import './lib/vant'




//配置axios
Axios.defaults.baseURL = "http://localhost:3000/api"//全局配置



Vue.prototype.http = Axios;

window.vm =new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
