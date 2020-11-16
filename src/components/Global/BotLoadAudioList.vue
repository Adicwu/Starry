<template>
  <div class="botload-audiolist" ref="contain">
    <slot></slot>
    <div class="botload-audiolist-items" v-if="isList">
      <AudioList
        v-for="(item, index) in curlist"
        @click.native="changeMusic(item, index)"
        :detail="item"
        :index="index + 1"
        :key="index"
      />
    </div>
    <div class="botload-audiolist-items" v-if="isItem">
      <AudioItem
        v-for="(item, index) in curlist"
        @click.native="changeMusic(item, index)"
        :detail="item"
        :listid="listid"
        :key="index"
      />
    </div>
    <div class="_tips" v-show="wait">加载中...</div>
  </div>
</template>

<script>
function throttle(fn, delay) {
  let flag = true;
  return function () {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, delay);
  };
}
import { songDetail, songUrl } from "apis/song";
import AudioList from "comps/card/AudioList";
import AudioItem from "comps/card/AudioItem";
export default {
  name: "botloadaudiolist",
  components: {
    AudioList,
    AudioItem,
  },
  props: {
    perpage: {
      type: Number,
      default: 5,
    },
    listid: {
      type: Number,
      default: 0,
    },
    data: Array,
    type: {
      type: String,
      default: "list",
    },
    fromBottom: {
      type: Number,
      default: 20,
    },
    target: {
      type: String,
      default: "",
    },
    isbind: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      flag: true,
      tpage: 1,
      curlist: [],
      wait: false,
      isLoding: false,
    };
  },
  computed: {
    hasMore() {
      return this.tpage * this.perpage < this.data.length;
    },
    isList() {
      return this.type === "list";
    },
    isItem() {
      return this.type === "item";
    },
    bindDom() {
      return this.target === ""
        ? this.$refs.contain
        : document.querySelector(this.target);
    },
  },
  watch: {
    isbind(val) {
      val ? this.addEvent() : this.removeEvent();
    },
  },
  mounted() {
    this.addItem();
    this.addEvent();
  },
  beforeDestroy() {
    this.removeEvent();
  },
  methods: {
    addEvent() {
      if (!this.isbind) return;
      this.bindDom.addEventListener("scroll", this.mainScroll);
    },
    removeEvent() {
      this.bindDom.removeEventListener("scroll", this.mainScroll);
    },
    addItem() {
      let arr = [];
      if (this.data.length <= this.perpage) {
        arr = this.data.map((item) => item.id).toString();
        this.flag = false;
      } else {
        arr = this.data
          .slice(this.curlist.length, this.perpage * this.tpage)
          .map((item) => item.id)
          .toString();
      }
      this.mainRequest(arr);
    },
    mainRequest(arr) {
      this.isLoding = true;
      Promise.all([songDetail(arr), songUrl(arr)]).then((res) => {
        let songs = res[0].data.songs;
        let song_url = res[1].data.data;
        song_url.forEach((val) => {
          let index = songs.findIndex((item) => val.id === item.id);
          songs[index].url = val.url;
        });
        this.curlist.push(...songs);
        this.wait = false;
        this.isLoding = false;
      });
    },
    mainScroll: throttle(function (e) {
      if (!this.hasMore || this.isLoding) return;
      let { scrollHeight, clientHeight, scrollTop } = e.target;
      if (scrollHeight - clientHeight - scrollTop < this.fromBottom) {
        this.loadMore();
      }
    }, 30),
    loadMore() {
      this.tpage++;
      this.addItem();
    },
    changeMusic(item, index) {
      if (item.url == null) return this.$toast("莫得资源~");
      let obj = {
        list: this.data,
        id: this.listid,
        index,
      };
      this.$store.dispatch("changeCurMusic", obj);
    },
  },
};
</script>

<style lang="less" scoped>
.botload-audiolist {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  .botload-audiolist-items {
    & > div:last-child {
      margin-bottom: 80px;
    }
  }
  ._tips {
    text-align: center;
    font-size: 10px;
    color: crimson;
  }
}
</style>
