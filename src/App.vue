<template>
  <div id="app">
    
      <router-view></router-view>
    
      <FooterNav :navOptions="footerNav" :router="true"></FooterNav>
    
  </div>
</template>


<script>
import FooterNav from '@/components/FooterNav.vue'

export default {
  name:"App",
  components:{
    FooterNav
  },
  data () {
    return {
      //底部导航信息
      footerNav:[
        {path:'/home',src:require("@/assets/img/index.png"),activeSrc:require("@/assets/img/index_active.png")},
        {path:'/category',src:require("@/assets/img/category.png"),activeSrc:require("@/assets/img/category_active.png")},
        {path:'/jingxi',src:require("@/assets/img/jingxi.png"),activeSrc:""},
        {path:'/cart',src:require("@/assets/img/cart.png"),activeSrc:require("@/assets/img/cart_active.png")},
        {path:'/login',src:require("@/assets/img/no_login.png"),activeSrc:""},
      ]
    }
  }
}
</script>

<style lang="less" scoped>
#app{

}
// .main{
//   width: 100%;
//   height: 85%;
//   overflow: hidden;
// }
// .bottom{
//   width: 100%;
//   height: 15%;
// }
</style>
