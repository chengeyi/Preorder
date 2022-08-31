import Vue from 'vue'
import App from './App.vue'

// 引入Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

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
Vue.use(VueAxios, axios)
Vue.component(CollapseTransition.name, CollapseTransition)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')

// try {
//   const step = {
//     orderNumber: "101708100123456",// 交易單號
//     txnDir: "RQ", // M 交易方向
//     endpointCode: "00000001",// M 端末代號
//     terminalId: "00000001",// M 終端號
//     txnAmt: "20000", // C 訂單金額
//     txnCurrency: "901", // C 交易幣別碼
//     expiryDate: "20220810151159",// C QR Code 效期
//     format: "0",// M 回傳QRCODE格式
//     notifyUrl: "B",// O 交易結果主動通知網址
//     isWebToApp: "B",// C 是否為 Web To APP 支付
//     webToAppRetUrl: "B",// C Web To APP 交易結果回傳特店網址
//     sign: "",// M 簽章
//   };
//   const keyValue = "requestHeader={}&requestBody=" + JSON.stringify(step);
//   axios({
//     method: "post",
//     headers: {
//       "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
//     },
//     url: "http://192.168.10.112/servlet/twpay/V1/controller/PreOrderServlet",
//     data: keyValue,
//   }).then((res) => {
//     console.log(res)
//   });
// } catch (error) {
// }
