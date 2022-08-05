import Vue from 'vue'
import App from './App.vue'

//引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-TW'

//引入Vuex
import store from './store/index'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale });

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
