<template>
  <div class="user-detail">
    <BreakHeader fixed class="_header">
      <transition
        enter-active-class="slideInUp"
        leave-active-class="slideOutUp"
      >
        <div class="_header-tool" v-show="flags.userinfo">
          <div class="_header-tool-info">
            <b>{{ detail.nickname }}</b>
            <p v-if="!isLogged">{{ detail.followeds }} 粉丝</p>
          </div>
          <span v-if="!isLogged">+ 关注</span>
        </div>
      </transition>
    </BreakHeader>
    <div class="user-detail-cover active" v-if="flags.load">
      <img :src="detail.backgroundUrl + '?param=700y700'" alt />
      <transition
        enter-active-class="slideInDown"
        leave-active-class="slideOutUp"
      >
        <div class="_info" v-show="!flags.userinfo">
          <img :src="detail.avatarUrl + squareImgSize" alt />
          <p>{{ detail.nickname }}</p>
          <div class="_info-tips">
            <div>
              <span>关注 {{ detail.follows }}</span>
              <span>粉丝 {{ detail.followeds }}</span>
              <ul>
                <li>{{ ageRank }}</li>
                <li>
                  <i>Lv.{{ info.level }}</i>
                </li>
              </ul>
            </div>
            <ul v-if="isLogged">
              <li @click="toMainPage('/home/userdetail/userinfo', userId)">
                编辑
              </li>
              <li>更换背景</li>
            </ul>
            <ul v-else>
              <li>+ 关注</li>
              <li>发私信</li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <van-tabs
      v-model="nav.active"
      class="user-detail-contain"
      swipeable
      animated
      background="rgba(0,0,0,0)"
      sticky
      :offset-top="48"
      @scroll="scrollHandler"
      v-if="flags.load"
    >
      <van-tab :title="nav.list[0].text">
        <UdHome :userinfo="detail" />
      </van-tab>
      <van-tab :title="nav.list[1].text">
        <UdTrend />
      </van-tab>
    </van-tabs>
    <transition
      enter-active-class="child-route-in"
      leave-active-class="child-route-out"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
import { userDetail } from "apis/user";
import UdHome from "./child/UdHome";
import UdTrend from "./child/UdTrend";
export default {
  name: "userdetail",
  components: {
    UdHome,
    UdTrend,
  },
  inject: ["user"],
  provide() {
    return {
      nav: this.nav,
    };
  },
  data() {
    return {
      nav: {
        list: [
          { text: "主页", comp: "UdHome" },
          { text: "动态", comp: "UdTrend" },
        ],
        active: 0,
      },
      detail: {},
      info: {},
      flags: {
        contain: false,
        load: false,
        cover: false,
        userinfo: false,
      },
      userId: 0,
    };
  },
  computed: {
    ageRank() {
      let { birthday } = this.detail;
      return new Date(birthday).getFullYear().toString().slice(-2) + "后";
    },
    isLogged() {
      let { flag, userid } = this.user;
      return flag && userid == this.$route.query.id;
    },
    routeId() {
      return this.$route.query.id;
    },
  },
  watch: {
    routeId: {
      immediate: true,
      handler(val) {
        if (typeof val === "undefined") return;
        this.mainRequset(val);
      },
    },
  },
  methods: {
    mainRequset(id) {
      this.userId = id;
      this.flags.load = false;
      userDetail(id).then((res) => {
        this.detail = res.data.profile;
        this.info = res.data;
        this.flags.load = true;
      });
    },
    scrollHandler(key) {
      this.flags.userinfo != key.isFixed && (this.flags.userinfo = key.isFixed);
    },
  },
};
</script>

<style scoped lang="less">
@import "~styles/default/user_detail";
</style>
