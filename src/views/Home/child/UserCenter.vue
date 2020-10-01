<template>
  <div class="usercenter">
    <UcBanner />
    <div class="usercenter-contain" v-if="user.flag">
      <div class="_userinfo">
        <div class="_userinfo-item" @click="toUserSonglist(0)">
          <b>{{ userinfo.subcount.createdPlaylistCount }}</b>
          <span>歌单</span>
        </div>
        <div class="_userinfo-item" @click="toUserSonglist(1)">
          <b>{{ userinfo.subcount.subPlaylistCount }}</b>
          <span>收藏歌单</span>
        </div>
        <div class="_userinfo-item" @click="toMainPage('/home/userdetail', user.userid)">
          <b>{{ userinfo.subcount.eventlength }}</b>
          <span>动态</span>
        </div>
      </div>
      <div class="_motto">
        <p>If you shed tears when you miss the sun,</p>
        <p>you also miss the stars.</p>
      </div>
      <UcMyMusic />
      <UcMyPlaylist />
    </div>
  </div>
</template>

<script>
import { userSubcount, userEvent } from "apis/user";
import { rmdNewsSong } from "apis/song";
import UcMyMusic from "./child/UcMyMusic";
import UcMyPlaylist from "./child/UcMyPlaylist";
import UcBanner from "./child/UcBanner";
export default {
  name: "usercenter",
  inject: ["user"],
  components: {
    UcMyMusic,
    UcMyPlaylist,
    UcBanner
  },
  data() {
    return {
      userinfo: {
        subcount: ""
      },
      song: {
        rmdnews: ""
      }
    };
  },
  watch: {
    "user.flag": {
      immediate: true,
      handler(val) {
        val && this.mainRequest();
      }
    }
  },
  computed: {},
  mounted() {},
  methods: {
    mainRequest() {
      if (this.user.flag) {
        Promise.all([
          new Promise(resolve => {
            userSubcount().then(res => resolve(res.data));
          }),
          new Promise(resolve => {
            userEvent(this.user.userid).then(res => resolve(res.data.size));
          })
        ]).then(res => {
          this.userinfo.subcount = res[0];
          this.userinfo.subcount.eventlength = res[1];
        });
      }
    },
    toUserSonglist(type) {
      let { flag, userid: id } = this.user;
      if (!flag) return;
      this.$router.push({
        path: "/home/userdetail/usersonglist",
        query: { id, type }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/default/user_center.less";
</style>
