
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category'
import JingXi from '../views/JingXi'
import Cart from '../views/Cart'
import Login from '../views/Login'

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
