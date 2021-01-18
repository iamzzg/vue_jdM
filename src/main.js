
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'


Vue.config.productionTip = false

//引入css
import './assets/css/normalize.css'
import './assets/css/common.css'





//配置axios
Axios.defaults.baseURL = "http://localhost:3000/api"//全局配置

Vue.prototype.http = Axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
