<template>
  <div class="home">
    <PullUpLoad @pullUp="onPullUp" :parentPullUpState="1">
      <!-- 顶部广告 -->
    <div v-if="show_guanggao" class="top-guanggao">
      <div class="close">
        <img src="../assets/img/close.png" alt="" />
      </div>
      <div class="logo">
        <img src="../assets/img/jingdong_logo.png" alt="" />
      </div>
      <div class="title">打开京东App购物更轻松</div>
      <div class="open">立即打开</div>
    </div>
    <!-- 搜索框 -->
    <div
      ref="search_area"
      class="search-area"
      :class="{ 'fix-to-top': isFixed }"
    >
      <div class="inner">
        <span class="sanghenggang"></span>
        <div class="search-input">
          <div class="jd-logo"></div>
          <div class="shuxian"></div>
          <div class="search-icon"></div>
          <div class="keyword">{{ keyword }}</div>
        </div>
        <div class="login">登录</div>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="carousel" :class="{ 'fix-to-top': isFixed }">
      <swiper
        :slides-per-view="1"
        :space-between="500"
        :options="swiperOptions_lunbo"
      >
        <swiper-slide class="" v-for="(banner, index) in banners" :key="index"
          ><img :src="banner.url" alt=""
        /></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- 导航区域 -->
    <NavSwiper></NavSwiper>

    <!-- 秒杀区域 -->
    <MiaoSha></MiaoSha>

    <!-- 商品展示区域 -->
    <Goods ref="goodsRef"></Goods>

    <!-- 右侧返回顶部 -->
    <div class="back-to-top" v-if="showToTopBox" @click="scrollToTop">↑</div>
    </PullUpLoad>
  </div>
</template>

<script>
// @ is an alias to /src

//引入swiper插件
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

import NavSwiper from "@/components/Home/NavSwiper.vue";
import MiaoSha from "@/components/Home/MiaoSha.vue";
import Goods from "@/components/Home/Goods.vue";
import PullUpLoad from "@/components/PullUpLoad.vue"

export default {
  name: "Home",
  data() {
    return {
      //swiper插件轮播选项
      swiperOptions_lunbo: {
        // 自动播放
        autoplay: true,
        // 循环播放
        loop: true,
        //分页器
        pagination: {
          el: ".swiper-pagination",
        },
      },
      //swiper导航配置
      swiperOptions_nav: {
        observer: true, //修改swiper自己或子元素，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        //分页器
        pagination: {
          el: ".swiper-pagination",
        },
      },
      //存放轮播图路径
      banners: [],
      //存放导航数据
      navList: [],
      //搜索关键字
      keyword: "壁挂式空调",
      //控制显示顶部广告
      show_guanggao: true,
      //控制搜索框顶部固定
      isFixed: false,
      //控制显示返回顶部按钮
      showToTopBox:false,
      
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    NavSwiper,
    MiaoSha,
    Goods,
    PullUpLoad
  },
  methods: {
    //获取轮播图路径
    async getBanners() {
      const { data: res } = await this.http.get("/img/swiper");
      this.banners = JSON.parse(res.data).map((item) => {
        return {
          url: require("@/" + item),
        };
      });
    },
    //监听滚动事件
    scrollHandler(e) {
      // console.log(e)
      //页面滚动距离
      let windowScrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //视口高度
      let viewHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      //页面总高度
      let pageHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      if (windowScrollTop > 0) {
        //页面一滚动
        if (this.show_guanggao) {
          //隐藏顶部广告
          this.show_guanggao = false;
          this.isFixed = true;
        }
      }

      if (windowScrollTop === 0) {
        //页面滚回顶部
        this.show_guanggao = true;
        this.isFixed = false;
      }

      //滚动超过一定距离
      if(windowScrollTop >= 300){
        if(!this.showToTopBox){
          this.showToTopBox=true
        }
      }
    },
    //监听上拉
    onPullUp(done){
      setTimeout(() => {
        this.$refs.goodsRef.getGoodList(4)
        done()
      }, 1500);
      
    },
    //滚回页面顶部
    scrollToTop(){
      window.scrollTo(0,0)
    }
  },
  created() {
    //获取轮播图数据
    this.getBanners();
  },
  mounted() {
    //添加页面滚动事件
    window.addEventListener("scroll", this.scrollHandler);
  },
  destroyed() {
    //该组件销毁时移除滚动事件
    window.removeEventListener("scroll", this.scrollHandler);
  },
};
</script>

<style lang="less" scoped>
.home {
  position: relative;
  padding-bottom: 8vh;
  box-sizing: border-box;
  //顶部广告
  .top-guanggao {
    height: 0.45rem;
    background-color: black;
    display: flex;
    .close {
      width: 10vw;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 33%;
      }
    }
    .logo {
      width: 10vw;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 90%;
      }
    }
    .title {
      width: 60vw;
      height: 100%;
      line-height: 0.45rem;
      text-align: center;
      font-size: 0.16rem;
      color: #ffffff;
    }
    .open {
      width: 20vw;
      height: 100%;
      line-height: 0.45rem;
      text-align: center;
      font-size: 0.16rem;
      background-color: #f63515;
      color: #ffffff;
    }
  }
  //搜索框
  .search-area {
    height: 0.4rem;
    width: 100%;
    background: #c82519;
    padding: 0 3vw;
    box-sizing: border-box;

    .inner {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      //分类
      .sanghenggang {
        display: block;
        width: 7vw;
        height: 50%;
        background: url("../assets/img/sanhenggang.png") no-repeat;
        background-size: contain;
      }
      //中间搜索区域
      .search-input {
        width: 70vw;
        height: 70%;
        border-radius: 0.32rem;
        background: #ffffff;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 0.15rem;
        box-sizing: border-box;
        .jd-logo {
          width: 0.2rem;
          height: 0.15rem;
          background: url("../assets/img/jd_icon.png") no-repeat;
          background-size: cover;
        }
        .shuxian {
          margin-left: 0.1rem;
          height: 0.15rem;
          width: 0.01rem;
          background-color: #cccccc;
        }
        .search-icon {
          width: 0.18rem;
          height: 0.15rem;
          background: url("../assets/img/jd-sprites.png") no-repeat;
          background-position: -0.8rem 0;
          background-size: 2rem 2rem;
          margin-left: 0.1rem;
        }
        //搜索关键字
        .keyword {
          margin-left: 0.1rem;
          font-size: 0.12rem;
          color: #aaaaaa;
        }
      }
      //右侧登录
      .login {
        width: 10vw;
        height: 100%;
        font-size: 0.14rem;
        color: #ffffff;
        line-height: 0.4rem;
      }
    }
  }
  .search-area.fix-to-top {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
  }
  // 轮播图
  .carousel {
    width: 100%;
    padding: 3vw 3vw;
    box-sizing: border-box;
    // background-color: rgb(200,37,25);
    background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
    .swiper-container {
      border-radius: 5px;
      width: 100%;
      .swiper-slide {
        width: 100%;
        border-radius: 5px;
        img {
          width: 100%;
          // border-radius: 5px;
        }
      }
    }
  }
  .carousel.fix-to-top {
    margin-top: 0.4rem;
  }
  // 导航区域
  .nav-area {
    width: 100%;
    // padding: 3vw 3vw;
    box-sizing: border-box;
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
  //返回顶部
  .back-to-top{
    position: fixed;
    right: 10px;
    bottom: 15%;
    width: 0.3rem;
    height: 0.3rem;
    border: 1px solid #cccccc;
    box-shadow: 0 0 3px #eeeeee;
    line-height: 0.3rem;
    text-align: center;
    border-radius: 50%;
    background-color: #ffffff;
    color: #788888;
    font-size: 0.20rem;
  }
}

</style>
