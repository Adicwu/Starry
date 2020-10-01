<template>
  <div class="botload-request" ref="contain" @scroll.passive="mainScroll($event)">
    <slot></slot>
    <slot name="contain" :curdata="curlist"></slot>
  </div>
</template>

<script>
function throttle(fn, delay) {
  let flag = true;
  return function() {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, delay);
  };
}
export default {
  name: "botloadrequest",
  props: {
    perpage: {
      type: Number,
      default: 5
    },
    offset: {
      type: Boolean,
      default: false
    },
    fromBottom: {
      type: Number,
      default: 20
    },
    lastKey: {
      type: String,
      default: ""
    },
    request: Function,
    resword: String
  },
  data() {
    return {
      flag: true,
      tpage: 1,
      curlist: [],
      isLoading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.request(this.perpage).then(res => {
        let rel = res.data[this.resword];
        this.curlist.push(...rel);
        this.breakdata();
      });
    },
    mainScroll: throttle(function(e) {
      if (!this.flag) return;
      let { scrollHeight, clientHeight, scrollTop } = e.target;
      if (scrollHeight - clientHeight - scrollTop < this.fromBottom) {
        this.loadMore();
      }
    }, 300),
    loadMore() {
      if (typeof this.request === "undefined") return;
      this.tpage++;
      this.requestHandler();
    },
    requestHandler() {
      if (this.isLoading) return;
      this.isLoading = true;
      let args;
      let { offset, perpage, tpage } = this;
      if (offset) {
        if (this.lastKey) {
          let key = this.curlist[this.curlist.length - 1][this.lastKey];
          args = [perpage, key];
        } else {
          args = [perpage, tpage * perpage];
        }
        this.offsetRequest(args);
      } else {
        args = [tpage * perpage];
        this.dfRequest(args);
      }
    },
    dfRequest(args) {
      this.request(...args)
        .then(res => {
          let data = res.data[this.resword];
          let rel = data.slice(-this.perpage);
          this.curlist.push(...rel);
          this.breakdata();
        })
        .finally(e => (this.isLoading = false));
    },
    offsetRequest(args) {
      this.request(...args)
        .then(res => {
          let data = res.data[this.resword];
          if (data.length === 0) {
            this.flag = false;
            this.$toast("没有更多了嗷~");
          } else {
            this.curlist.push(...data);
            this.breakdata();
          }
        })
        .finally(e => (this.isLoading = false));
    },
    breakdata() {
      this.$emit("breakdata", this.curlist);
    }
  }
};
</script>

<style lang="less" scoped>
.botload-request {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  & > :last-child {
    margin-bottom: 80px;
  }
}
</style>
