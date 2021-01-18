<!--
 * @Author: your name
 * @Date: 2021-01-17 15:22:41
 * @LastEditTime: 2021-01-17 23:01:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_jdM\vue_jdm\src\components\MiaoSha.vue
-->
<template>
  <div class="miaosha-area">
    <div class="inner">
        <!-- 秒杀顶部 -->
      <div class="top">
        <a href="javascript:;" class="left">
            <span class="jd_ms">京东秒杀</span>
            <span class="time">14</span>
            <span class="dc_img"></span>
            <span class="ms_h">{{ms_h}}</span>:
            <span class="ms_m">{{ms_m}}</span>:
            <span class="ms_s">{{ms_s}}</span>
        </a>
        <a href="javascript:;" class="right">
            <span class="more_ms">更多秒杀</span>
            <img src="../../assets/img/arrow_rt.png" alt="">
        </a>
      </div>
      <!-- 秒杀导航 -->
      <swiper
        :slides-per-view="1"
        :space-between="50"
        :options="swiperOptions_miaosha"
        v-if="show"
      >
        <swiper-slide v-for="(navArr, index) in misoshaList" :key="index">
          <a href="#" v-for="(nav, i) in navArr" :key="i">
            <img :src="nav.url" alt="" />
            <span class="ms_price">￥{{ nav.ms_price }}</span>
            <span class="o_price">￥{{ nav.o_price }}</span>
          </a>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
//引入swiper插件
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "MiaoSha",
  data() {
    return {
      //swiper秒杀配置
      swiperOptions_miaosha: {
        freeMode:true,
      },
      //存放秒杀数据
      misoshaList: [],
      //控制显示swiper
      show: false,
      //秒杀时间
      ms_h:0,
      ms_m:0,
      ms_s:0
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    
  },
  methods: {
    //获取秒杀数据
    async getMisoshaList() {
      const { data: res } = await this.http.get("img/miaosha");
      //转换数据格式
      JSON.parse(res.data).forEach((nav, index) => {
        if (this.misoshaList[Math.floor(index / 6)] === undefined) {
          this.misoshaList[Math.floor(index / 6)] = [];
        }
        this.misoshaList[Math.floor(index / 6)].push({
          url: require("@/" + nav.url),
          o_price: nav.o_price,
          ms_price:nav.ms_price
        });
      });

      //   获取到数据
      if (this.misoshaList && this.misoshaList.length > 0) {
        this.show = true;
      }
    },
    //设置秒杀时间
    setMiaoshaTime(timeObj){
        let h = timeObj.h||1
        let m = timeObj.m||0
        let s = timeObj.s||0

        // 初始化秒杀时间
        this.ms_h = String(h).padStart(2,"0")
        this.ms_m = String(m).padStart(2,"0")
        this.ms_s = String(s).padStart(2,"0")

        let totalSec = h*60*60+m*60+s

        let timer = null

        //定时器开启倒计时
        timer = setInterval(() => {
            if(totalSec<=0) {
              clearInterval(timer);
              this.ms_h="00";
              this.ms_m = "00"
              this.ms_s ="00"
              return;
            } 
            totalSec--
            this.ms_h = Math.floor(totalSec/3600).toString().padStart(2,"0")
            this.ms_m = Math.floor((totalSec-this.ms_h*3600)/60).toString().padStart(2,"0")
            this.ms_s = Math.floor((totalSec-this.ms_h*3600-this.ms_m*60)).toString().padStart(2,"0")
        }, 1000);
    }
  },
  mounted() {
    this.getMisoshaList();
    this.setMiaoshaTime({h:2,m:0,s:0})
  },
};
</script>

<style lang="less" scoped>
// 秒杀区域
.miaosha-area {
  width: 100%;
  padding: 3vw 3vw;
  box-sizing: border-box;
  .inner{
      width: 100%;
      height: 1.4rem;
      background-color: #fff;
      border-radius: 0.1rem;
      .top{
          height: 0.35rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.14rem;
          background: url("../../assets/img/ms_bg.png") no-repeat;
          background-size: cover;
          a{
              text-decoration: none;
              color: #444444;
          }
          a.left{
              display: flex;
              height: 100%;
              align-items: center;
              width: 1.95rem;
              .jd_ms{
                  margin-left: 0.13rem;
              }
              .time{
                  margin-left: 0.1rem;
                  color: #fa2c19;
              }
              .dc_img{
                  display: inline-block;
                  width: 0.16rem;
                  height: 0.16rem;
                  background: url("../../assets/img/seckill_time.png") no-repeat;
                  background-size: cover;
                  margin-right: 0.1rem;
              }
              .ms_h,.ms_m,.ms_s{
                  display: inline-block;
                  padding: 0.04rem 0.01rem;
                  color: #fff;
                  background-color:#fa2c19;
                  border-radius: 5px;
                  margin-right: 0.01rem;
              }
              .ms_m{
                  margin: 0 0.01rem;
              }
              .ms_s{
                  margin-left: 0.01rem;
              }
          }
          a.right{
              display: flex;
              align-items: center;
              color: #fa2c19;
              img{
                  width: 0.15rem;
              }
          }
      }
  }
  //swiper插件秒杀导航
  .swiper-container {
    width: 100%;
    height: 1.5rem;
    padding-bottom: 0.1rem;
    .swiper-slide {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      a {
        width: calc(100% / 6);
        height: 0.75rem;
        text-align: center;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
        color: #333333;
        font-size: 0.12rem;
        text-decoration: none;
        img {
          width: 0.55rem;
          margin-bottom: 0.15rem;
          margin-top: 0.05rem;
        }
        .ms_price{
            color:#fa2c19;
            font-weight: 700;
        }
        .o_price{
            color: #aaaaaa;
            text-decoration: line-through;
        }
      }
    }
  }
}
</style>

