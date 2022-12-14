import Vue from 'vue'
import App from './App.vue'

//引入 router
import router from "./router" ;

// 引入Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// 引入Axios
import animate from "animate.css";
Vue.use(animate);

// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import locale from 'element-ui/lib/locale/lang/zh-TW'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
locale.el.pagination = {
  goto: '跳至',
  pagesize: '',
  total: `{total}`,
  pageClassifier: '頁',
};

// 引入Vuex
import store from './store';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
//import locale from './assets/locale/cn'; // 引入自己的

// 引入sweetalert2
import Swal from 'sweetalert2'

window.Swal = Swal;

//引入moment
import Moment from 'moment'

Vue.prototype.$moment = Moment;
Vue.config.productionTip = false
Vue.use(ElementUI, { locale });
Vue.use(store);
Vue.use(VueAxios, axios)
Vue.component(CollapseTransition.name, CollapseTransition)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
