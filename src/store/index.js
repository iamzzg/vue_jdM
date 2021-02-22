import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    //购物车
    carts:[],
    //用户信息
    userInfo:null,
    // 控制显示底部导航
    showFooterNav:true,
    //当前分类二级分类id
    cate_detail_id:0,
    //二级分类数据
    cate_detail_list:[],
    //选中的goods_id
    checkedGoodsIdArr:[]
  },
  mutations: {
    //添加商品到购物车
    addCart(state,payload){
      //carts的形式[{goods_id:1,count:1}]
      const index = state.carts.findIndex(item=>item.goods_id==payload.goods_id)
      if(index===-1){//没有该商品
        state.carts.push(payload)
      }else{
        state.carts[index].count += payload.count;
      }
    },
    //设置用户信息
    setUserInfo(state,user){
      state.userInfo = user;
    },
    //删除用户信息
    removeUserInfo(state){
      state.userInfo = {}
    },
    //设置当前二级分类id
    set_cate_detail_id(state,payload){
      state.cate_detail_id = payload
    },
    //设置控制显示底部导航
    setShowFooterNav(state,payload){
      state.showFooterNav = payload
    },
    //清空购物车
    clearCart(state){
      state.carts=[]
      state.checkedGoodsIdArr=[]
    }
  },
  actions: {
    //发起请求添加到购物车
    addCart(context,payload){
      context.commit('addCart',payload)
    },
    // 请求用户信息
    async getUserInfo(context){
      //axios get请求设置请求头
      // console.log('请求用户数据')
      const { data: res } = await axios.get("/user", {
        headers: { Authorization: window.sessionStorage.getItem('token') },
      });
      console.log(res)
      if(res.status==='ok'){
        // 请求成功
        console.log("请求用户数据",res.data)
        res.data.avatar = require("@/" + res.data.avatar);
        context.commit('setUserInfo',res.data)
        return true;
      }else{
        console.log("请求用户数据失败")
        return false
      }
    },
  }
})
