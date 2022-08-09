<template >
  <div id="app">
    <!-- <Center></Center> -->
    <!-- <OrderList></OrderList> -->
    <OrderList2></OrderList2>
  </div>
</template>

<script>
// import Center from './components/Center.vue'
// import OrderList from './components/OrderList.vue'
import OrderList2 from './components/OrderList2.vue'
export default {
  name: 'App',
  components: {
    // Center,
    // OrderList,
    OrderList2
  }
}
</script>

<style>
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


</style>
