import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
state: {
    examination: true,
    orderList:[
        {
            order_number:'7867473872181848',
            order_price:'8888',
            pay_status:1,
            is_send:'未出貨',
            create_time:'2022/08/01'
        },
        {
            order_number:'7867473872181849',
            order_price:'8888',
            pay_status:1,
            is_send:'未出貨',
            create_time:'2022/08/01'
        },
        {
            order_number:'7867473872181850',
            order_price:'8888',
            pay_status:2,
            is_send:'未出貨',
            create_time:'2022/08/01'
        },
        {
            order_number:'7867473872181851',
            order_price:'8888',
            pay_status:1,
            is_send:'未出貨',
            create_time:'2022/08/01'
        },
        {
            order_number:'7867473872181852',
            order_price:'8888',
            pay_status:2,
            is_send:'未出貨',
            create_time:'2022/08/01'
        },
        {
            order_number:'7867473872181853',
            order_price:'8888',
            pay_status:1,
            is_send:'未出貨',
            create_time:'2022/08/01'
        }
    ]
},
actions: {},
mutations: {},
getters: {}
})
export default store;