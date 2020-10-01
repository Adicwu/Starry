<template>
  <div class="song-search">
    <div class="_header">
      <div class="_header-control" :class="{ '_header-control-focus': focusflag }">
        <div class="_header-control-input">
          <van-icon name="search" />
          <input
            type="text"
            placeholder="搜索..."
            ref="searchinput"
            v-model="search.key"
            @keyup.enter="doSearch"
            @focus="focusflag = true"
            @mouseleave="focusflag = false"
          />
        </div>
        <van-icon name="apps-o" />
      </div>
      <div class="_header-banner" :class="{ '_header-banner-focus': focusflag }"></div>
    </div>
    <div class="_contain" :class="{ '_contain-focus': focusflag }">
      <BotLoad :size="15" :data="search.val" @breakdata="curlsitHandler" v-if="reloadflag">
        <SearchAudioItem v-for="(item, index) in search.curval" :detail="item" :key="index" />
      </BotLoad>
    </div>
  </div>
</template>

<script>
import { searchKey } from "apis/song";
import SearchAudioItem from "comps/item/SearchAudioItem";
export default {
  name: "songsearch",
  components: {
    SearchAudioItem
  },
  data() {
    return {
      focusflag: false,
      reloadflag: false,
      search: {
        key: "",
        oldkey: "",
        val: [],
        count: 0,
        curval: []
      }
    };
  },
  watch: {
    "search.val"(newVal, oldVal) {
      newVal != oldVal && this.reloadContain();
    }
  },
  computed: {
    allowedSearch() {
      return this.search.key != this.search.oldkey && this.search.key != "";
    }
  },
  mounted() {},
  methods: {
    doSearch() {
      if (!this.allowedSearch) return;
      this.$refs.searchinput.blur();
      this.focusflag = false;
      searchKey(this.search.key).then(res => {
        this.search.val = res.songs;
        this.search.count = res.songCount;
        this.search.oldkey = this.search.key;
      });
    },
    reloadContain() {
      this.reloadflag = false;
      this.search.curval.length = 0;
      setTimeout(() => (this.reloadflag = true));
    },
    curlsitHandler(val) {
      this.search.curval = val;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/default/song_search";
</style>
