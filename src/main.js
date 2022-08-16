import Vue from 'vue'
import App from './App.vue'

//引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import locale from 'element-ui/lib/locale/lang/zh-TW'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

//引入Vuex
import store from './store/index'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale });
Vue.component(CollapseTransition.name, CollapseTransition)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
