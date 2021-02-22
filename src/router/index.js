
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
const Home = () => import(/* webpackChunkName: "group-home" */ '../views/Home.vue')
// import Category from '../views/Category/Category'
const Category = () => import(/* webpackChunkName: "group-category" */ '../views/Category/Category.vue')
// import JingXi from '../views/JingXi'
const JingXi = () => import(/* webpackChunkName: "group-JingXi" */ '../views/JingXi.vue')
// import Cart from '../views/Cart'
const Cart = () => import(/* webpackChunkName: "group-Cart" */ '../views/Cart.vue')
// import Login from '../views/Login'
const Login = () => import(/* webpackChunkName: "group-Login" */ '../views/Login.vue')
// import User from '../views/User'
const User = () => import(/* webpackChunkName: "group-User" */ '../views/User.vue')
// import CateDetail from '../views/Category/CateDetail'
const CateDetail = () => import(/* webpackChunkName: "group-category" */ '../views/Category/CateDetail.vue')
// import Order from '@/views/Order'
const Order = () => import(/* webpackChunkName: "group-Order" */ '../views/Order.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    meta: { title:"首页" },
    component: Home
  },
  {
    path:"/category",
    meta: { title:"分类" },
    component:Category
  },
  {
    path:"/catedetail/:id",
    meta:{title:"分类详情"},
    component:CateDetail
  },
  {
    path:'/jingxi',
    meta:{title:"惊喜"},
    component:JingXi
  },
  {
    path:'/cart',
    meta:{title:"购物车"},
    component:Cart
  },
  {
    path:'/login',
    meta:{title:"登录页"},
    component:Login
  },
  {
    path:'/order',
    meta:{title:"提交订单"},
    component:Order
  },
  {
    path:'/user',
    meta:{title:"用户信息"},
    component:User,
    beforeEnter:(to, from, next) => {//进入这个路由前验证token
      // console.log('user')
      if(!window.sessionStorage.getItem("token")){
        next('/login')
      }else{//有token，放行
        next()
      }
    }
  },
  {
    path:"*",
    redirect: '/home'
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.路由懒加载
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  
]



const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title

  next()
})

export default router
