import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/global.css'
import ElementUI from 'element-ui'
import '@/utils/ax.js'
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
