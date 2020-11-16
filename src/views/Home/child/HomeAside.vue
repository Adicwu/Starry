<template>
  <van-popup class="home-aside" v-model="aside.flag" position="left">
    <Scroll scrollY bounce class="_contain">
      <div class="_contain-banner">
        <div class="_contain-banner-avatar" @click="toUserDetail">
          <img :src="userinfo.avatarUrl" alt />
        </div>
        <span>{{ userinfo.nickname }}</span>
      </div>
      <div class="_contain-tools">
        <div class="_block-one">
          <span
            v-for="(item, index) in icons"
            :key="index"
            @click="toElsePage(item.path)"
          >
            <van-icon
              :name="item.icon"
              :badge="item.badge > 0 ? item.badge : ''"
            />
            {{ item.text }}
          </span>
        </div>
        <hr />
        <div class="_items van-icon van-icon-bulb-o">听歌识曲</div>
        <hr />
        <div
          v-for="(item, index) in items"
          :key="index"
          class="_items van-icon"
          :class="item.icon"
        >
          {{ item.text }}
        </div>
      </div>
    </Scroll>
    <div class="_footer">
      <span></span>
      <span></span>
      <span class="fa fa-sign-out" @click="logon">退出登录</span>
    </div>
  </van-popup>
</template>

<script>
import { userEvent } from "apis/user";
import { adConfirm } from "@/utils/Decorator";
export default {
  name: "homeaside",
  data() {
    return {
      aside: {
        flag: false,
      },
      userinfo: {},
      icons: [
        {
          icon: "envelop-o",
          text: "我的消息",
          path: "/home/usernews",
          badge: 0,
        },
        {
          icon: "friends-o",
          text: "我的好友",
          path: "/home/userfriend",
          badge: 0,
        },
        {
          icon: "wap-home-o",
          text: "个人主页",
          path: "/home/userdetail",
          badge: 0,
        },
        {
          icon: "shop-o",
          text: "个性装扮",
          path: "/home",
          badge: 0,
        },
      ],
      items: [
        {
          icon: "van-icon-orders-o",
          text: "我的订单",
          path: "",
        },
        {
          icon: "van-icon-underway-o",
          text: "定时停止播放",
          path: "",
        },
        {
          icon: "van-icon-scan",
          text: "扫一扫",
          path: "",
        },
      ],
    };
  },
  inject: ["user"],
  watch: {
    "aside.flag": {
      immediate: true,
      handler(val) {
        if (val) {
          if (window.history.state != "homeAside") {
            window.history.pushState("homeAside", null, null);
          }
          window.onpopstate = this.close;
          this.user.flag && this.mainRequest();
        }
      },
    },
  },
  methods: {
    open() {
      this.aside.flag = true;
    },
    close() {
      this.aside.flag = false;
    },
    @adConfirm("确定注销吗")
    logon() {
      this.$store.dispatch("signOut").then(location.reload);
    },
    mainRequest() {
      let { userid } = this.user;
      userEvent(userid).then((res) => {
        this.userinfo = res.data.events[1].user;
        this.icons[2].path = `/home/userdetail?id=${this.user.userid}`;
      });
    },
    toUserDetail() {
      let { userId } = this.userinfo;
      this.aside.flag = false;
      this.toMainPage("/home/userdetail", userId);
    },
    toElsePage(path) {
      this.aside.flag = false;
      this.toMainPage(path);
    },
  },
};
</script>

<style lang="less" scoped>
.home-aside {
  width: 80%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 50px;
  background: #737373;
  ._contain {
    position: relative;
    ._contain-banner {
      display: flex;
      align-items: center;
      margin: 0 20px;
      margin-top: 40px;
      padding-bottom: 8vw;
      box-sizing: border-box;
      height: 34vw;
      border-radius: 14px;
      background: linear-gradient(to bottom, #7e7e7e, #666);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      ._contain-banner-avatar {
        width: 16vw;
        height: 16vw;
        margin-left: 20px;
        border-radius: 50%;
        background: #fff;
        overflow: hidden;
      }
      span {
        font-size: 16px;
        font-weight: 800;
        margin-left: 16px;
        color: #fff;
      }
    }
    ._contain-tools {
      width: 100%;
      height: 800px;
      margin-top: -8vw;
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;
      background: #fff;
      box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
      ._block-one {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        width: 100%;
        span {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 10px;
          padding: 10px 0;
          margin-top: 10px;
          i::before {
            margin-bottom: 4px;
            font-size: 26px;
            color: crimson;
          }
        }
      }
      hr {
        margin: 8px 20px;
        border: none;
        height: 1px;
        background: #e6e6e6;
        transform: scaleY(0.5);
      }
      ._items {
        display: flex;
        align-items: center;
        padding: 10px 16px;
        font-size: 14px;
        color: #373737;
        &:active {
          background: rgba(0, 0, 0, 0.2);
        }
        &::before {
          font-size: 22px;
          margin-right: 8px;
        }
      }
    }
  }
  ._footer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    border-top: 1px solid #eee;
    box-sizing: border-box;
    background: #fff;
    span {
      align-self: center;
      justify-self: center;
      font-size: 0.875rem;
    }
  }
}
</style>
