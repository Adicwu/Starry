<template>
  <div class="login">
    <div class="login-banner">
      <img src="~static/img/login-bg.jpg" alt />
    </div>
    <div class="login-box">
      <h3>Starry 登录</h3>
      <div class="_input-group">
        <label class="fa fa-user-o"></label>
        <input
          type="text"
          maxlength="11"
          v-next-input
          v-model.number="login.phone"
          placeholder="手机号码"
        />
      </div>
      <div class="_input-group">
        <label class="fa fa-unlock-alt"></label>
        <input
          type="password"
          maxlength="14"
          v-model="login.password"
          placeholder="密码"
          @keyup.enter="loginHandler"
        />
      </div>
      <p>请使用网易云音乐账号，暂不开放注册</p>
      <p>详情致网易云音乐app</p>
      <input type="button" class="_btn-login" @click="loginHandler" value="点击登录" />
    </div>
  </div>
</template>

<script>
import { login, loginRefresh } from "apis/user";
export default {
  name: "login",
  data() {
    return {
      login: {
        phone: "",
        password: ""
      }
    };
  },
  computed: {
    isAllowedLogin() {
      let { phone, password } = this.login;
      return phone != "" && password != "";
    }
  },
  mounted() {
    this.$store.state.user.flag && this.$router.replace("/home");
  },
  methods: {
    loginHandler() {
      if (!this.isAllowedLogin) return;
      let key = {
        phone: this.login.phone,
        password: this.login.password
      };
      login(key).then(res => {
        if (res.data.code === 200) {
          let data = res.data;
          alert("登录成功~");
          let info = {
            flag: true,
            userid: data.account.id,
            token: data.token,
            cookie: data.cookie
          };
          sessionStorage.setItem("state", JSON.stringify(info));
          this.$store.commit("setAccessToken", info);
          this.$router.replace("/home");
        } else {
          alert(res.data.msg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/default/login";
</style>
