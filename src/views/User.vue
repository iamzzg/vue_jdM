<template>
  <div class="user">
    <div class="top" v-if="$store.state.userInfo">
      <div class="avatar" ><img :src="userInfo.avatar" alt="" /></div>
      <div class="right">
        <div class="right-top">
          <div class="nickname">{{ userInfo.nickname }}</div>
          <div class="log-out" @click="logOut">[退出登录]</div>
        </div>
        <div class="right-bottom">京享值7193</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   userInfo: {},
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    //请求用户信息
    async getUserInfo() {
      const result = await this.$store.dispatch("getUserInfo");
      if (result === true) {
        //token认证通过
      } else {
        //token失效，重新登录
        this.$router.push("/login");
      }
    },
    //退出登录
    logOut() {
      window.sessionStorage.removeItem("token");
      this.$store.commit('removeUserInfo')
      this.$router.push("/");
    },
  },
  created() {
    
    this.getUserInfo();
  },
};
</script>
 
<style lang='less' scoped>
.user {
  width: 100%;
  height: 100%;
  // background-color: #ffffff;
  padding: 0 20px;
  box-sizing: border-box;
  .top {
    padding: 20px;
    background-color: #ffffff;
    height: 0.45rem;
    display: flex;
    margin: 0 -20px;
    .avatar {
      height: 0.45rem;
      width: 0.45rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .right {
      width: 100%;
      .right-top {
        display: flex;
        justify-content: space-between;
        .nickname {
          margin-left: 0.2rem;
        }
        .log-out {
          color: #666666;
          font-size: 12px;
          background-color: #eeeeee;
        }
      }
      .right-bottom {
        font-size: 0.12px;
        margin-left: 12px;
        color: #aaa;
        margin-top: 10px;
      }
    }
  }
}
</style>