<!--
 * @Author: your name
 * @Date: 2021-01-17 18:08:55
 * @LastEditTime: 2021-01-17 19:49:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_jdM\vue_jdm\src\components\Home\Goods.vue
-->
<template>
  <div class="goods-area">
      <div class="inner">
          <div class="good-box" v-for="(good,index) in goodList" :key="index">
              <img :src="good.url" alt="">
              <span class="text">{{good.text}}</span>
              <p class="similar-good-info">
                  <span class="price">￥{{good.price}}</span>
                  <span class="good-tag">{{good.price_tag}}</span>
                  <span class="look-similar">看相似</span>
              </p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"Goods",
    data () {
        return {
            goodList:[]
        }
    },
    methods: {
        async getGoodList(num){
            const {data:res} = await this.http.get("/img/good",{params:{num:num}})
            if(res.status!=='ok') return;
            let data = JSON.parse(res.data)

            let temp = {}
            //更改数据中的图片路径,并赋值给this.goodList
            data.forEach(good=>{
                good.url = require("@/"+good.url)
                this.goodList.push(good)
            })
            // console.log(this.goodList)
        }
    },
    mounted () {
        this.getGoodList(5)
    }
    
}
</script>

<style lang="less" scoped>
.goods-area{
    width: 100%;
    padding: 3vw 3vw;
    box-sizing: border-box;
    padding-bottom: 0.02rem;
    .inner{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        //商品区域
        .good-box{
            width: 48%;
            border-radius: 0.1rem;
            background-color: #ffffff;
            padding-bottom: 0.04rem;
            margin-bottom: 0.1rem;
            img{
                width: 100%;
                border-radius: 0.1rem 0.1rem 0 0;
            }
            .text{
                font-size: 0.14rem;
                width: 100%;
                box-sizing: border-box;
                padding: 0 0.03rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .similar-good-info{
                .price{
                    color: #f63515;
                    font-weight: 700;
                    margin-right: 0.1rem;
                }
                .good-tag{
                    color: #f63515;
                    font-size: 0.12rem;
                    display: inline-block;
                    padding: 0.02rem;
                    border: 1px solid #f63515;
                }
                .look-similar{
                    float: right;
                    color: #999999;
                    background-color: #dddddd;
                    font-size: 0.12rem;
                    padding: 0.02rem;
                    border-radius: 0.05rem;
                }
            }
        }
    }
}
</style>