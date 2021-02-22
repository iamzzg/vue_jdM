<template>
  <div class="cate-detail">
    <!-- 顶部 -->
    <div class="top">
      <div class="back-to-home" @click="backToCate">&lt;</div>
      <div class="search-input">
        <div class="search-icon"></div>
        <input type="text" class="input" placeholder="电脑" />
      </div>
      <div class="nav">···</div>
    </div>
    <!-- 主体内容 -->
    <div class="main">
      <div class="box" v-for="(item, index) in cate_detail_list" :key="index">
        <div class="left">
          <img :src="item.src" alt="" />
        </div>
        <div class="right">
          <p class="text">{{ item.text }}</p>
          <p class="price"><span>￥</span>{{ item.price }}</p>
          <p class="grand">
            {{ item.grand }}
            <span class="addcart" @click="addCart(item.goods_id)">加入购物车</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 购物车 -->
    <div class="cart">
        <div class="count" @click="$router.push('/cart')">{{carts.length}}</div>
    </div>
    <!-- <div v-for="(good,index) in carts" :key="index">
        {{good.goods_id}}:{{good.count}}
    </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Number from "@/components/Number";
export default {
  components: {
    Number,
  },
  data() {
    return {
        cate_detail_list:[]
    };
  },
  computed: {
    ...mapState(['carts']),
  },
  methods: {
    //返回分类
    backToCate() {
      this.$store.commit("setShowFooterNav", true);
      this.$router.push("/category");
    },
    //添加到购物车
    addCart(goods_id){
        const goods = this.cate_detail_list.find(item=>item.goods_id == goods_id)
        console.log("购买的商品",goods)
        this.$store.commit('addCart',{...goods,count:1})
        console.log("购物车列表",this.$store.state.carts)
    },
    //请求二级分类商品数据
    async getCateDetail(){
        const {data:res} = await this.http.get('/catagory/detail/'+this.$route.params.id)
        if(res.status=='ok'){
            res.data.list.forEach(item=>{
                item.src = require('@/'+item.src)
            })
            this.cate_detail_list = res.data.list
            console.log("具体商品信息：",this.cate_detail_list)
        }else{
            console.log("请求分类商品数据失败")
        }
    }
  },
  created () {
      //请求数据
      this.getCateDetail()
  }
};
</script>

<style lang="less" scoped>
.cate-detail {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding-bottom: 8vh;
  //顶部
  .top {
    height: 0.45rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #dddddd;
    .back-to-home {
      font-size: 0.25rem;
    }
    .search-input {
      width: 75%;
      height: 0.35rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background-color: #eeeeee;
      border-radius: 0.45rem;
      .search-icon {
        display: block;
        width: 0.2rem;
        height: 0.2rem;
        margin-left: 0.2rem;
        background: url("../../assets/img/jd-sprites.png") no-repeat;
        background-size: 200px 200px;
        background-position: -80px 3px;
      }
      .input {
        display: block;
        padding: 0;
        background-color: #eeeeee;
        outline: none;
        border: none;
        height: 0.2rem;
        width: 70%;
        font-size: 0.18px;
      }
    }

    .nav {
      font-size: 24px;
      letter-spacing: 2px;
    }
  }
  //列表内容
  .main {
    .box {
      width: 100%;
      height: 1.5rem;
      border-bottom: 1px solid #dddddd;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .left {
        width: 1.2rem;
        height: 1.2rem;
        img {
          width: 1.2rem;
          height: 1.2rem;
        }
      }
      .right {
        margin-left: 0.15rem;
        .text {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          font-size: 14px;
        }
        .price {
          color: rgb(211, 23, 23);
          span {
            font-size: 12px;
          }
        }
        .grand {
          font-size: 12px;
          color: #ccc;
          display: flex;
          justify-content: space-between;
          height: 0.3rem;
          line-height: 0.3rem;
          .addcart{
              margin-right: 0.2rem;
              display: inline-block;
              color: #ffffff;
              width: 0.6rem;
              height: 0.3rem;
              padding: 0 10px;
              background-color: rgb(211, 23, 23);
          }
        }
      }
    }
  }
  .cart{
      width: 44px;
      height: 44px;
      background: url('../../assets/img/cart-icon.png') no-repeat;
    //   background-position: -182px -53px;
    //   background-color: #eeeeee;
      margin-left: 10px;
      margin-top: 10px;
      position: relative;
      .count{
          width: 17px;
          height: 17px;
          background-color: rgb(211, 23, 23);
          border-radius: 50%;
          color: #ffffff;
          position: absolute;
          right: 0%;
          text-align: center;
          line-height: 15px;
          font-size: 12px;
      }
  }
}
</style>