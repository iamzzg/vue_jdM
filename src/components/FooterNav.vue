<template>
  <div class="footer-nav">
      <a href="javascript:;" v-for="(nav,index) in navOptions" :key="index" @click="onClickToRouter(nav)">
        <img :src="nav.activeSrc?nav.activeSrc:nav.src" v-if="nav.path===$route.path">
        <img :src="nav.src" alt="" v-else>
      </a>
      <!-- <a href="javascript:;">
        <img src="../assets/img/index.png" alt="">
      </a>
      <a href="javascript:;">
        <img src="../assets/img/category.png" alt="">
      </a>
      <a href="javascript:;">
        <img src="../assets/img/jingxi.png" alt="">
      </a>
      <a href="javascript:;">
        <img src="../assets/img/cart.png" alt="">
      </a>
      <a href="javascript:;">
        <img src="../assets/img/no_login.png" alt="">
      </a> -->
  </div>
</template>

<script>
export default {
    name:"FooterNav",
    props: {
      navOptions:{
        type:Array,
        default:null
      },
      router:{
        type:Boolean,
        default:false
      }
    },
    data () {
      return {
      }
    },
    methods: {
      //点击导航跳转
      onClickToRouter(nav){
        if(!this.router) return alert("路由模式没开启")
        if(this.$route.path===nav.path)return;
        this.$router.push(nav.path)
      }
    }
}
</script>

<style lang="less" scoped>
.footer-nav{
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8vh;
  box-sizing: border-box;
  box-shadow: 0 -1px 2px  #eeeeee ;
  background-color: #ffffff;
  z-index: 9999;
  a{
    text-decoration: none;
    color: #999999;
    width: 20vw;
    img {
      height: 100%;
      width: 100%;
    }
  }
  
}
</style>