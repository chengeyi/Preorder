<template >
  <div id="app" class="appContainer">
    <!-- <sideNav id="sideNav"></sideNav> -->
    <!-- <OrderList2 id="OrderList"></OrderList2> -->
    <!-- <OrderList2 id="OrderList"></OrderList2> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Center from './components/Center.vue'
// import OrderList from './components/OrderList.vue'
// import OrderList2 from './views/OrderList2.vue'
import { mapActions } from 'vuex'

//import sideNav from './views/sideNav.vue'
export default {
  name: 'App',
  components: {
    // OrderList2,
    //sideNav,
    //OrderList
  },
  methods:{
    ...mapActions['languageSet']
  },
  mounted(){
    this.$store.dispatch('languageSet')
  },
  created(){
    if(!localStorage.getItem('lang')){
      localStorage.setItem('lang','ch');
    }
    this.$store.dispatch('languageSet')
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}

.appContainer{

}

#sideNav{
  /* flex-grow: 2; */
}

#OrderList{
  /* flex-grow: 1; */
  width: 100%;
}

.ml-3{
  margin-left: 12px;
}

.ml-5{
  margin-left: 30px;
}

.mr-3{
  margin-right: 12px;
}

.mr-5{
  margin-right: 30px;
}

.mb-3{
  margin-bottom: 12px;
}

.w-100{
  width: 100% !important;
}

.text-right{
  text-align: right !important;
}


</style>
