<template>
  <div class="cart">
    <!-- 顶部 -->
    <div class="top">
      <span class="back-icon" @click="backToCategory">&lt;</span>
      <span class="middle">购物车</span>
      <span class="more">···</span>
    </div>
    <!-- 编辑登录区域 -->
    <div class="info">
      <div class="edit-area">
        <div class="position">朝阳区三环到四环之间</div>
        <div class="edit" @click="showPay = !showPay">
          {{ showPay ? "编辑商品" : "完成" }}
        </div>
      </div>
      <div class="login-area" v-if="!token">
        <p>登录后可以同步账户中购物车中的商品</p>
        <div class="login-button" @click="login" >登录</div>
      </div>
    </div>
    <!-- 购物车 -->
    <div class="main" ref="main">
      <div class="box" v-for="(item, index) in $store.state.carts" :key="index">
        <!-- 复选框 -->
        <div
          :class="
            checkedGoodsIdArr.indexOf(item.goods_id) !== -1 ? 'checked' : ''
          "
          class="checkbox"
          @click="onCheck(item.goods_id)"
        >
          ✔
        </div>
        <!-- 图片 -->
        <div class="left">
          <img :src="item.src" alt="" />
        </div>
        <!-- 右边部分 -->
        <div class="right">
          <p class="text">{{ item.text }}</p>
          <p class="price"><span>￥</span>{{ item.price }}</p>
          <p class="grand">
            {{ item.grand }}
            <Number
              class="number"
              v-model="item.count"
              @on-change="onChangeCount"
            ></Number>
          </p>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="bottom">
      <div class="left">
        <span
          :class="{
            checked:
              this.cartGoodsIdArr.length &&
              this.checkedGoodsIdArr.length === this.cartGoodsIdArr.length,
          }"
          class="check-all"
          @click="checkAll"
          >✔</span
        >
        <span>全选</span>
      </div>
      <div class="right">
        <!-- 总计 -->
        <span class="cost" v-if="showPay">总计：￥{{ totalCost }}</span>
        <span
          :class="{ checked: this.checkedGoodsIdArr.length !== 0 }"
          class="pay"
          v-if="showPay"
          @click="checkout"
          >去结算({{ checkedGoodsCount }}件)</span
        >
        <span class="delete" v-if="!showPay" @click="deleteGoods">删除</span>
      </div>
    </div>
  </div>
</template>

<script>
import Number from "@/components/Number.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      //控制底部显示结算按钮
      showPay: true,
      //每个商品的check
      checked: false,
      //是否全选
      isCheckAll: false,
      //选中的goods_id
      checkedGoodsIdArr: [],
    };
  },
  components: {
    Number,
  },
  computed: {
    // ...mapState(['carts']),
    // ...mapState(['cate_detail_list'])
    token(){
      return window.sessionStorage.getItem('token');
    },
    //选中的商品数组
    checkGoodsArr() {
      return this.$store.state.carts.filter((goods) =>
        this.checkedGoodsIdArr.includes(goods.goods_id)
      );
    },
    //选中的费用
    totalCost() {
      const cost = this.checkGoodsArr.reduce((pre, cur) => {
        return pre + cur.count * cur.price;
      }, 0);
      return cost;
    },
    // 选中的商品数量
    checkedGoodsCount() {
      return this.checkGoodsArr.reduce((pre, cur) => {
        return pre + cur.count;
      }, 0);
    },
    //购物车中所有商品id
    cartGoodsIdArr() {
      return this.$store.state.carts.map((item) => item.goods_id);
    },
  },
  methods: {
    //返回分类页
    backToCategory() {
      this.$store.commit("setShowFooterNav", true);
      this.$router.push("/category");
    },
    //选择一个
    onCheck(goods_id) {
      //切换转中的goods_id
      const index = this.checkedGoodsIdArr.indexOf(goods_id);
      if (index == -1) {
        this.checkedGoodsIdArr.push(goods_id);
      } else {
        this.checkedGoodsIdArr.splice(index);
      }
      console.log("所有的商品id", this.cartGoodsIdArr);
    },
    //切换全选和取消全选
    checkAll(event) {
      // //切换本身状态
      if (this.checkedGoodsIdArr.length === this.cartGoodsIdArr.length) {
        //如果已经是全选
        this.checkedGoodsIdArr = [];
      } else {
        //没有全选
        this.checkedGoodsIdArr = this.cartGoodsIdArr.map((item) => item);
      }
      // console.log("选中所有商品的id:",this.checkedGoodsIdArr)
    },
    //监听购买数量
    onChangeCount(val) {
      console.log("当前的购买数量:", val);
      console.log("当前购物车：", this.$store.state.carts);
    },
    //删除购物车商品
    deleteGoods() {
      // console.log("当前选中商品id：",this.checkedGoodsIdArr)
      // console.log("当前购物车：",this.$store.state.carts)
      if (this.checkedGoodsIdArr.length === 0) return;
      let tempCarts = this.$store.state.carts.filter((good) => {
        if (
          this.checkedGoodsIdArr.findIndex((item) => item == good.goods_id) !==
          -1
        ) {
          //过滤掉被选中的goods_id
          return false;
        } else {
          return true;
        }
      });
      this.$store.state.carts = tempCarts.map((item) => item);
      this.checkedGoodsIdArr = [];
      console.log("删除后购物车：", this.$store.state.carts);
    },
    //监听点击结算按钮
    checkout() {
      if (this.checkedGoodsIdArr.length === 0) return; //未选中要结算的商品
      console.log('已选中的商品id',this.checkedGoodsIdArr)
      this.$store.state.checkedGoodsIdArr = this.checkedGoodsIdArr
      // console.log(this.$store.state.checkedGoodsIdArr)
      if (window.sessionStorage.getItem('token')) {
        console.log("已登录");
        this.$store.commit("setShowFooterNav",false)
        this.$router.push('/order')
      } else {
        console.log("未登录");
        this.login()
      }
    },
    //登录
    login() {
      this.$store.commit("setShowFooterNav", true);
      this.$router.push("/login");
    },
  },
  mounted() {
    //不显示底部导航
    this.$store.commit("setShowFooterNav", false);
  },
  watch: {
    checkedGoodsIdArr(val){
      this.$store.state.checkedGoodsIdArr = val
    }
  }
};
</script>

<style lang='less' scoped>
.cart {
  width: 100%;
  height: 100%;
  // background-color: #ffffff;
  // 顶部
  .top {
    height: 0.4rem;
    border-bottom: 1px solid #cccccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    .back-icon {
      margin-left: 0.2rem;
      color: black;
      font-size: 0.24rem;
    }
    .middle {
      font-size: 0.2rem;
      text-align: center;
    }
    .more {
      letter-spacing: 2px;
      font-size: 24px;
      margin-right: 0.1rem;
    }
  }
  // 编辑
  .info {
    background-color: #ffffff;
    border-radius: 0 0 20px 20px;
    padding-bottom: 0.15rem;
    font-size: 0.12rem;
    //编辑
    .edit-area {
      padding-top: 0.1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .position {
        margin-left: 0.2rem;
      }
      .edit {
        padding-left: 0.2rem;
        border-left: 1px solid #bbbbbb;
        margin-right: 0.1rem;
      }
    }
    //登录
    .login-area {
      padding-top: 0.3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        font-size: 0.14rem;
        margin-right: 0.2rem;
      }
      .login-button {
        width: 0.6rem;
        height: 0.35rem;
        line-height: 0.35rem;
        text-align: center;
        color: #ffffff;
        background-color: rgb(224, 15, 15);
        border-radius: 0.2rem;
      }
    }
  }
  //列表内容
  .main {
    background: #ffffff;
    margin-top: 0.2rem;
    margin-bottom: 8vh;
    // 商品列表
    .box {
      width: 100%;
      height: 1.5rem;
      border-bottom: 1px solid #dddddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .checkbox {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid #bbbbbb;
        margin-left: 0.05rem;
        line-height: 20px;
        text-align: center;
        color: #ffffff;
      }
      //被选中时的样式
      .checkbox.checked {
        border-color: rgb(211, 23, 23);
        background: rgb(211, 23, 23);
      }
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
        width: 60%;
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
          .number {
            margin-right: 0.2rem;
          }
        }
      }
    }
  }
  // 底部
  .bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 0.5rem;
    font-size: 0.14rem;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      margin-left: 0.2rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .check-all {
        width: 0.2rem;
        height: 0.2rem;
        border: 2px solid #bbbbbb;
        border-radius: 50%;
        display: inline-block;
        line-height: 0.2rem;
        text-align: center;
        color: #ffffff;
      }
      .check-all.checked {
        border-color: rgb(211, 23, 23);
        background: rgb(211, 23, 23);
      }
    }
    .right {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      // 结算按钮
      .pay {
        display: inline-block;
        width: 115px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: rgba(243, 74, 74, 0.5);
        color: #ffffff;
        border-radius: 20px;
        margin-left: 10px;
      }
      .pay.checked {
        background-color: rgb(211, 23, 23);
      }
      // 删除按钮
      .delete {
        width: 0.66rem;
        height: 0.3rem;
        border: 1px solid #666666;
        background: #ffffff;
        color: #666666;
        line-height: 0.3rem;
        text-align: center;
        margin-right: 0.2rem;
        border-radius: 0.15rem;
      }
    }
  }
}
</style>