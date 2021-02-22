<template>
  <div class="order">
    <!-- 顶部 -->
    <div class="top">
      <div class="back-to-cart" @click="backToCart">&lt;</div>
      <div class="title">填写订单</div>
    </div>
    <!-- 地址 -->
    <div class="address-area">
      <p class="address">
        <van-form @submit="onSubmit" ref="orderFormRef">
          <van-field
            v-model="fieldValue"
            is-link
            readonly
            label="地区"
            placeholder="请选择所在地区"
            @click="show = true"
            :rules="[{ required: true }]"
          />
          <!-- 地址选择级联器 -->
          <van-popup v-model="show" round position="bottom">
            <van-cascader
              v-model="cascaderValue"
              title="请选择所在地区"
              :options="options"
              @close="show = false"
              @finish="onFinish"
            />
          </van-popup>
          <van-field
            v-model="addressValue"
            label="详细地址"
            placeholder="请输入具体地址"
            :rules="[{ required: true }]"
          />
          <van-field
            v-model="phone"
            label="联系方式"
            placeholder="请输入手机号"
            :rules="[
              {
                required: true,
                pattern: phonePattern,
                message: '请输入正确的手机号',
              },
            ]"
          />
          <van-field
            v-model="name"
            label="收件人"
            placeholder="请输入收件人"
            :rules="[{ required: true }]"
          />
        </van-form>
      </p>
    </div>

    <!-- 购物车区域 -->
    <div class="check-cart">
      <div class="shops-name">京东自营</div>
      <div class="imgList">
        <div class="img">
          <img
            :src="goods.src"
            alt=""
            v-for="(goods, index) in checkGoodsArr"
            :key="index"
          />
        </div>
        <div class="allCount">共{{ checkedGoodsCount }}件</div>
      </div>
      <div class="delivery">
        <div class="title">配送</div>
        <div class="way">
          <p>京东快递</p>
          <p>为您从外地跨区调货</p>
          <p>工作日、双休日与假日均可送货</p>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="bottom">
      <div class="cost">￥{{ totalCost }}</div>
      <div class="submit-order" @click="submit_order">提交订单</div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      show: false,
      fieldValue: "",
      cascaderValue: "",
      addressValue: "",
      phone: "",
      name: "",
      phonePattern: /\d{11}/,
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [
        {
          text: "浙江省",
          value: "330000",
          children: [{ text: "杭州市", value: "330100" }],
        },
        {
          text: "江苏省",
          value: "320000",
          children: [{ text: "南京市", value: "320100" }],
        },
        {
          text: "广东省",
          value: "310000",
          children: [
            {
              text: "深圳市",
              value: "310100",
              children: [{ text: "福田区", value: "320101" }],
            },
          ],
        },
      ],
    };
  },
  computed: {
    //选中的商品数组
    checkGoodsArr() {
      return this.$store.state.carts.filter((goods) =>
        this.$store.state.checkedGoodsIdArr.includes(goods.goods_id)
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
  },
  methods: {
    backToCart() {
      this.$router.push("/cart");
    },
    //提交订单
    async submit_order() {
      this.$refs.orderFormRef.submit();
    },
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      this.show = false;
      this.fieldValue = selectedOptions.map((option) => option.text).join("/");
    },
    // 表单提交
    async onSubmit() {
      const address = this.fieldValue + "/" + this.addressValue;
      const checkedGoods = this.checkGoodsArr.map((good) => {
        return {
          goods_id: good.goods_id,
          count: good.count,
        };
      });
      //   发起请求
      const { data: res } = await this.http.post(
        "/order",
        qs.stringify({
          checkedGoods: JSON.stringify(checkedGoods),
          address: address,
          phone: this.phone,
          name: this.name,
        }),
        {
          headers: { Authorization: window.sessionStorage.getItem("token") },
        }
      );
      if (res.status === "ok") {
        this.$toast({
          message: "订单提交成功",
          onClose: () => {
            //清空购物车
            this.$store.commit('clearCart')
            this.$router.push("/cart");
          },
        });
      }
      console.log("order的结果", res);
    },
  },
};
</script>

<style lang="less" scoped>
.order {
  width: 100%;

  // 顶部
  .top {
    height: 0.45rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #ffffff;
    .back-to-cart {
      font-size: 24px;
      margin-left: 0.2rem;
    }
    .title {
      width: 75%;
      text-align: center;
      font-size: 20px;
    }
  }
  // 地址区域
  .address-area {
    padding: 0 10px 10px 10px;
    border-bottom: 2px dashed #cccccc;
    background-color: #ffffff;
  }
  //购物车区域
  .check-cart {
    margin-top: 10px;
    padding: 10px;
    background-color: #ffffff;
    .shops-name {
      font-size: 14px;
    }
    //购物车图片
    .imgList {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .img {
        width: 80%;
        height: 1rem;
        overflow: auto;
        display: flex;
        flex-wrap: nowrap;
        img {
          width: 1rem;
        }
      }
      // 不出现滚动条
      .img::-webkit-scrollbar {
        display: none !important;
        width: 0;
        height: 0;
      }
    }
    .delivery {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      .way {
        font-size: 0.12rem;
        // display: flex;
        // justify-content: flex-start;
        // align-items: flex-start;
        // flex-direction: column;
        p {
          text-align: right;
          margin: 0;
        }
      }
    }
  }
  // 底部
  .bottom {
    width: 100%;
    height: 0.5rem;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .cost {
      margin-left: 0.2rem;
      color: rgb(194, 5, 5);
    }
    .submit-order {
      width: 0.8rem;
      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      color: #ffffff;
      font-size: 0.14rem;
      border-radius: 0.2rem;
      margin-right: 0.2rem;
      background: linear-gradient(to right, rgb(216, 6, 6), rgb(238, 111, 7));
    }
  }
}
</style>