<!--
 * @Author: your name
 * @Date: 2021-01-15 22:08:56
 * @LastEditTime: 2021-01-17 18:59:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_jdm\src\components\footer-nav.vue
-->
<template>
  <div class="footer-nav">
      <a href="javascript:;">
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
      </a>
  </div>
</template>

<script>
export default {
    name:"FooterNav"
}
</script>

<style lang="less" scoped>
.footer-nav{
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  // height: 0.6rem;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 -1px 2px  #eeeeee ;
  background-color: #ffffff;
  z-index: 9999;
  a{
    text-decoration: none;
    color: #999999;
    width: 20vw;
    img {
      width: 100%;
    }
  }
  
}
</style>