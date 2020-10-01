<template>
  <div class="botload" ref="contain">
    <slot></slot>
    <slot name="contain" :curdata="currentlist"></slot>
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
  name: "botload",
  props: {
    data: Array,
    target: {
      type: String,
      default: ""
    },
    perpage: {
      type: Number,
      default: 5
    },
    fromBottom: {
      type: Number,
      default: 20
    },
    isbind: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentpage: 1,
      flag: true
    };
  },
  computed: {
    currentlist() {
      return this.data.length <= this.perpage
        ? this.data
        : this.data.slice(0, this.perpage * this.currentpage);
    },
    bindDom() {
      return this.target === ""
        ? this.$refs.contain
        : document.querySelector(this.target);
    }
  },
  watch: {
    isbind(val) {
      val ? this.addEvent() : this.removeEvent();
    }
  },
  mounted() {
    this.breakdata();
    this.addEvent();
  },
  beforeDestroy() {
    this.removeEvent();
  },
  methods: {
    addEvent() {
      if (!this.isbind) return;
      this.bindDom.addEventListener("scroll", this.mainScroll,false);
    },
    removeEvent() {
      this.bindDom.removeEventListener("scroll", this.mainScroll);
    },
    mainScroll: throttle(function(e) {
      if (!this.flag) return;
      let { scrollHeight, clientHeight, scrollTop } = e.target;
      if (scrollHeight - clientHeight - scrollTop < this.fromBottom) {
        this.loadMore();
      }
    }, 300),
    loadMore() {
      if (this.currentpage <= this.data.length / this.perpage) {
        this.currentpage++;
        this.breakdata();
      } else {
        this.$toast("已经没有了嗷~");
        this.flag = false;
      }
    },
    breakdata() {
      this.$emit("breakdata", this.currentlist);
    }
  }
};
</script>

<style lang="less" scoped>
.botload {
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
