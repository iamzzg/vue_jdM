<template>
  <div id="app">
    <router-view></router-view>
    <FooterNav></FooterNav>
  </div>
</template>


<script>
import FooterNav from '@/components/FooterNav.vue'

export default {
  name:"App",
  components:{
    FooterNav
  }
}
</script>

<style lang="less" scoped>
.app
{
  width: 100px;
  height: 100px;
  background-color: aqua;
  font-size: 0.16rem;
}
</style>
