<template>
  <div class="catagory">
    <div class="top">
      <div class="back" @click="backToHome">&lt;</div>
      <div class="search">
        <span class="search-icon"></span>
        <input type="text" name="" id="" placeholder="电视" />
      </div>
      <div class="right">···</div>
    </div>
    <!-- 主体部分 -->
    <div class="main">
      <!-- 左边部分 -->
      <div class="left">
        <Scroll class="left-scroll-container">
          <div :class="index===activeIndex?'active':''"
          @click="changeCate(cate.cat_id,index)" class="cate-nav" v-for="(cate,index) in catagoryList" :key="index">
            {{cate.cat_name}}
          </div>
        </Scroll>
      </div>
      <!-- 右边部分 -->
      <div class="right">
        <Scroll class="right-scroll-container">
          <div class="content">
            <!-- 内容顶部 -->
            <div class="content-top">
              <div class="nav-title">{{cateData.cat_name}}</div>
              <div class="nav-rank">
                <span class="img"></span>
                <span>排行榜</span>
                <span class="icon">&gt;</span>
              </div>
            </div>
            <!-- 内容区域 -->
            <div class="content-main">
              <div class="box" v-for="(item,index) in cateData.data" :key="index">
                <img :src="item.src" alt="">
                <span>{{item.name}}</span>
              </div>
            </div>
          </div>
        </Scroll>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from "@/components/Scroll.vue";
export default {
  components: {
    Scroll,
  },
  data () {
    return {
      //分类数据列表
      catagoryList:[],
      //当前激活分类
      activeIndex:0,
      //当前分类内容
      cateData:{}
    }
  },
  methods: {
    //返回主页
    backToHome() {
      this.$router.push("/home");
    },
    //请求分类数据
    async getCatagoryList(){  
      const {data:res} = await this.http.get('/catagory');
      if(res.status==='ok'){
        this.catagoryList = res.data;
        console.log(res.data)
      }else{
        return alert("请求分类列表数据失败！")
      }
    },
    //监听点击分类
    async changeCate(id,index){
      console.log(id)
      this.activeIndex = index
      const {data:res} = await this.http.get(`catagory/${id}`)
      if(res.status=='ok'){
        this.cateData = res.data;
        this.cateData.data.forEach(item=>{
          item.src = require("@/"+item.src)
        })
      }else{
        return alert('请求分类数据失败')
      }
    }
  },
  async created () {
    await this.getCatagoryList()
    await this.changeCate(this.catagoryList[0].cat_id,0)
  }
};
</script>

<style lang="less">
.catagory {
  //顶部导航
  .top {
    width: 100%;
    height: 0.44rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-bottom: 1px solid #dddddd;
    .back {
      height: 0.44rem;
      line-height: 0.44rem;
      font-size: 0.2rem;
      text-align: center;
      margin-left: 0.15rem;
    }
    .search {
      height: 0.35rem;
      width: 75%;
      background: rgb(247, 247, 247);
      color: #aaaaaa;
      display: flex;
      align-items: center;
      border-radius: 0.18rem;
      .search-icon {
        display: inline-block;
        margin-left: 0.3rem;
        width: 0.18rem;
        height: 0.16rem;
        background: url("../assets/img/jd-sprites.png") no-repeat;
        background-position: -81px 0;
        background-size: 200px 200px;
        margin-right: 0.2rem;
      }
      input {
        border: none;
        background-color: rgb(247, 247, 247);
        color: #aaaaaa;
        font-size: 0.14rem;
        outline: none;
      }
    }
    .right {
      height: 0.44rem;
      line-height: 0.44rem;
      font-size: 0.25rem;
      margin-right: 0.1rem;
      letter-spacing: 1px;
    }
  }
  .main {
    width: 100%;
    background-color: #fff;
    display: flex;
    //左边内容区域
    .left {
      width: 25%;
      height: 85vh;
      background-color: rgb(247, 247, 247);
      .left-scroll-container {
        height: 100%;
        .cate-nav {
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        font-size: 0.14rem;
      }
      .cate-nav.active{
        background-color: #fff;
        color: #e93b3d;
      }
      }
      
    }
    //右边内容区域
    .right {
      width: 100%;
      .right-scroll-container {
        height: 85vh;
        
        .content {
          // 内容顶部区域
          .content-top {
            padding-top: 0.15rem;
            display: flex;
            justify-content: space-between;
            border: none;
            .nav-title {
              font-size: 0.14rem;
              color: #222222;
              margin-left: 0.2rem;
            }
            .nav-rank {
              margin-right: 0.1rem;
              font-size: 0.14rem;
              color: #aaaaaa;
              .img {
                display: inline-block;
                width: 0.12rem;
                height: 0.12rem;
                background: url("../assets/img/rank.png") no-repeat;
                background-position: 0 0;
                background-size: 0.12rem 0.12rem;
                margin-right: 0.1rem;
              }
              .icon {
                color: #aaaaaa;
                margin-left: 0.1rem;
              }
            }
          }
          //内容主区域
          .content-main{
            width: 100%;
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            .box{
              width: 33%;
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;
              img{
                width: 80%;
                height: 80%;
              }
              span{
                font-size: 0.14rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>