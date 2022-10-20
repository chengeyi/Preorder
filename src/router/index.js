import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
      path :'/',
      name :'/login',
      component: () => import('@/views/sideNav.vue')
    },
    {
        path :'/OrderList2',
        name:"orderList",
        component: () => import('@/views/OrderList2.vue')
      },
]

const router = new VueRouter({
    routes
})

export default router