<template>
  <div class="login">
      <div class="top">
        京东登录注册
      </div>
      <div class="form">
        <div class="form-item">
          <label for="username">账户</label>
          <input type="text" placeholder="请输入账户名" id="username" ref="username">
        </div>
        <div class="form-item">
          <label for="password">密码</label>
          <input type="password" placeholder="请输入密码" id="password" ref="password">
        </div>
        <div class="button" @click="login">登录</div>
      </div>
      <!-- 提示框 -->
      <div class="message" v-if="showMessage">{{infoText}}</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import qs from 'qs'

export default {
  data () {
    return {
      showMessage:false,
      infoText:"请输入账户名或密码！"
    }
  },
  computed: {
    ...mapState({
      carts:state=>state.carts,
      user_id:state=>state.user_id
    })
  },
  methods: {
    async login(){
      const username = this.$refs.username.value
      const password = this.$refs.password.value
      if((!username)||(!password)) {
        this.infoText = "请输入账户名或密码！"
        return this.showMessage= true;
      }
      //输入账户密码发起登录请求
      const {data:res} = await this.http.post('/login',qs.stringify({username,password}))

      if(res.status==='ok'){//登录成功
        console.log(res)
        this.showMessage = false;
        // 保存token
        window.sessionStorage.setItem('token',res.data)
        //请求用户数据
        const result = await this.$store.dispatch('getUserInfo')
        if(!result) return;
        
        this.$router.push('/user')
      }else{//登录失败
        this.showMessage = true;
        this.infoText = "账户或者密码错误！"
        return ;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  height: 100%;
  background: #ffffff;
  padding: 0 0.15rem;
  box-sizing: border-box;
  .top{
    height: 0.45rem;
    line-height: 0.45rem;
    text-align: center;
  }
  .form{
    margin-top: 0.3rem;
    .form-item{
      width: 100%;
      border-bottom: 1px solid #cccccc;
      margin-bottom: 0.3rem;
      padding-bottom: 0.2rem;
      label{
        margin: 0 0.2rem;
      }
      input,input:focus{
        outline: none;
        color: #aaaaaa;
        border: none;
        background-color: #ffffff;
        width: 70%;
      }
    }
    .button{
      width: 100%;
      height: 0.4rem;
      background: #ffcaba;
      line-height: 0.4rem;
      text-align: center;
      color: #ffffff;
      border-radius: 0.4rem;
    }
  }
  .message{
    width: 80%;
    padding: 5px 0;
    margin: 0 auto;
    text-align: center;
    margin-top: 0.2rem;
    background-color: #e77070;
    border-radius: 3px;
    color: #ffffff;
  }
}
</style>