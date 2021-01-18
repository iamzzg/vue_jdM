<!--
 * @Author: your name
 * @Date: 2021-01-17 02:38:03
 * @LastEditTime: 2021-01-17 16:25:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_jdM\vue_jdm\src\components\NavSwiper.vue
-->
<template>
  <div class="nav-area">
    <swiper
      :slides-per-view="1"
      :space-between="500"
      :options="swiperOptions_nav"
      v-if="show"
      class="nav-swiper"
    >
      <swiper-slide v-for="(navArr, index) in navList" :key="index">
        <a href="#" v-for="(nav, i) in navArr" :key="i">
          <img :src="nav.url" alt="" />
          <span>{{ nav.title }}</span>
        </a>
      </swiper-slide>
      <div class="swiper-pagination nav-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
//引入swiper插件
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "NavSwiper",
  data() {
    return {
      //swiper导航配置
      swiperOptions_nav: {
        observer: true, //修改swiper自己或子元素，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        //分页器
        pagination: {
          el: ".swiper-pagination",
        },
      },
      //存放导航数据
      navList: [],
      //控制显示swiper
      show:false
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    //获取导航数据
    async getNavList() {
      const { data: res } = await this.http.get("img/nav");
      //转换数据格式
      JSON.parse(res.data).forEach((nav, index) => {
        if (this.navList[Math.floor(index / 10)] === undefined) {
          this.navList[Math.floor(index / 10)] = [];
        }
        this.navList[Math.floor(index / 10)].push({
          url: require("@/" + nav.url),
          title: nav.title,
        });
      });

    //   获取到数据
      if(this.navList&&this.navList.length>0){
        this.show = true
      }
      
    }
  },
  mounted () {
      this.getNavList()
      
  },
};
</script>

<style lang="less" scoped>
// 导航区域
.nav-area {
  width: 100%;
  // padding: 3vw 3vw;
  box-sizing: border-box;
  background-color: rgb(246,246,246);
  //swiper插件做导航
  .swiper-container {
    width: 100%;
    height: 1.5rem;
    padding-bottom: 0.1rem;
    .swiper-slide {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      a {
        width: 20%;
        height: 0.75rem;
        text-align: center;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        color: #333333;
        font-size: 0.12rem;
        text-decoration: none;
        img {
          width: 0.4rem;
        }
      }
    }
    .nav-pagination {
      bottom: 0 !important;
    }
  }
}
</style>