<template>
  <div class="home-search">
    <div class="_header">
      <div
        class="_header-control"
        :class="{ '_header-control-focus': isActive }"
      >
        <div class="_header-control-input">
          <van-icon name="search" />
          <input
            type="text"
            :placeholder="search.dftxt"
            ref="searchinput"
            v-model="search.key"
            @keyup.enter="doSearch"
            @focus="focusflag = true"
            @input="searchChanged"
            @mouseleave="focusflag = false"
          />
        </div>
        <van-icon name="apps-o" />
      </div>
      <div
        class="_header-banner"
        :class="{ '_header-banner-focus': isActive }"
      ></div>
    </div>
    <div class="_contain" :class="{ '_contain-focus': isActive }">
      <div class="_contain-unsearch" v-show="!hasKey">
        <!-- <div class="_title">
          <span>历史记录</span>
          <i class="van-icon van-icon-delete"></i>
        </div>
        <ul class="_history">
          <li>林俊杰</li>
          <li>林俊杰</li>
          <li>林俊杰</li>
        </ul>-->
        <div class="_title">热搜榜</div>
        <ul class="_hot">
          <li
            v-for="(item, index) in search.hot"
            :class="{ _info: index + 1 < 4 }"
            :key="index"
            @click="search.key = item.searchWord"
          >
            <span>{{ index + 1 }}</span>
            <div>
              <a class="text-truncate">{{ item.searchWord }}</a>
              <p class="text-truncate">{{ item.content }}</p>
            </div>
          </li>
        </ul>
      </div>
      <HsSuggest
        :list="search.suggest"
        :searchKey="search.key"
        @suggestClick="suggestClick"
      />
      <van-tabs
        v-model="nav.active"
        class="_contain-search"
        swipeable
        animated
        background="rgba(0,0,0,0)"
        v-if="hasKey"
        :key="nav.key"
      >
        <van-tab
          v-for="(item, index) in nav.list"
          :key="index"
          :title="item.text"
        >
          <div
            :is="item.comp"
            :navHanlder="changeNavActive"
            :keyword="search.key"
          ></div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { dfSearchTxt, fullHotSearch, searchSuggest } from "apis/else";
import { debounces } from "@/utils/Decorator";

import HsMix from "./child/HsMix";
import HsSong from "./child/HsSong";
import HsVideo from "./child/HsVideo";
import HsMv from "./child/HsMv";
import HsSinger from "./child/HsSinger";
import HsAlbum from "./child/HsAlbum";
import HsSonglist from "./child/HsSonglist";
import HsDj from "./child/HsDj";
import HsUser from "./child/HsUser";
import HsSuggest from "./child/HsSuggest";

export default {
  name: "homesearch",
  components: {
    HsMix,
    HsSong,
    HsVideo,
    HsMv,
    HsSinger,
    HsAlbum,
    HsSonglist,
    HsDj,
    HsUser,
    HsSuggest,
  },
  data() {
    return {
      focusflag: false,
      nav: {
        list: [
          { text: "综合", comp: "HsMix" },
          { text: "单曲", comp: "HsSong" },
          // { text: "云村", comp: "HsVideo" },
          { text: "视频", comp: "HsMv" },
          { text: "歌手", comp: "HsSinger" },
          { text: "专辑", comp: "HsAlbum" },
          { text: "歌单", comp: "HsSonglist" },
          { text: "主播电台", comp: "HsDj" },
          { text: "用户", comp: "HsUser" },
        ],
        active: 0,
        key: 0,
      },
      search: {
        key: "",
        oldkey: "",
        dftxt: "",
        hot: [],
        suggest: [],
      },
    };
  },
  computed: {
    allowedSearch() {
      let { key, oldkey, dftxt } = this.search;
      return key != oldkey && key != "";
    },
    hasKey() {
      return this.search.key !== "";
    },
    isActive() {
      return this.focusflag || this.search.key !== "";
    },
  },
  watch: {
    "search.key"(res) {
      if (res != "") this.nav.active = 0;
    },
  },
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      dfSearchTxt().then((res) => {
        this.search.dftxt = res.data.data.realkeyword;
      });
      fullHotSearch().then((res) => {
        this.search.hot = res.data.data;
      });
    },
    doSearch() {
      let { dftxt, key } = this.search;
      if (dftxt != "" && key === "") {
        this.search.key = dftxt;
      } else if (!this.allowedSearch) {
        return;
      }
      this.nav.active = 0;
      this.$refs.searchinput.blur();
      this.focusflag = false;
      this.nav.key = Math.random();
      this.clearSuggest();
    },
    changeNavActive(key) {
      this.nav.active = key;
    },
    @debounces(200)
    searchChanged() {
      let { key } = this.search;
      if (key === "") return;
      searchSuggest(key).then((res) => {
        let { result } = res.data;
        if (typeof result.allMatch !== "undefined") {
          this.search.suggest = result.allMatch;
        } else {
          this.search.suggest.splice(0);
        }
      });
    },
    clearSuggest() {
      this.search.suggest.splice(0);
    },
    suggestClick(key) {
      this.search.key = key;
      this.clearSuggest();
      this.doSearch();
    },
  },
};
</script>

<style lang="less" scoped>
@import "~styles/default/home_search";
</style>
