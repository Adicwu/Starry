<template>
  <div class="ad-waterfall" @scroll.passive="mainScroll($event)">
    <div class="left-cloumn" ref="leftlist">
      <slot name="left" :leftlist="list.left"></slot>
    </div>
    <div class="right-cloumn" ref="rightlist">
      <slot name="right" :rightlist="list.right"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import { throttles } from "@/utils/Decorator";
export default {
  name: "ad-waterfall",
  props: {
    data: Array,
    prepage: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      list: {
        left: [],
        right: [],
        lindex: 0,
        rindex: 0
      },
      loadflag: true
    };
  },
  computed: {
    indexCount() {
      let { lindex, rindex } = this.list;
      return lindex + rindex;
    }
  },
  watch: {
    indexCount(val) {
      let { data, prepage, emit } = this;
      if (data.length - val < prepage) $emit("more");
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.list.lindex = parseInt(this.prepage / 2);
      this.list.rindex = parseInt(this.prepage - this.list.lindex);
      this.partHandle(this.data);
    },
    partHandle(obj) {
      let pre = this.prepage;
      for (let i = 0; i < obj.length; i++) {
        if (i < pre) {
          this.list.left.push(obj[i]);
        }
        if (i >= pre && i < pre * 2) {
          this.list.right.push(obj[i]);
        }
        if (i >= pre * 2) {
          return;
        }
      }
    },
    @throttles(30)
    mainScroll(e) {
      let { scrollHeight, clientHeight, scrollTop } = e.target;
      let distance = parseInt(scrollHeight - clientHeight);
      let sctop = parseInt(scrollTop + 200);
      if (sctop <= distance + 200 && distance <= sctop) this.loadMore();
    },
    loadMore() {
      if (!this.loadflag) return;
      let left_hei = this.$refs.leftlist.clientHeight,
        righ_hei = this.$refs.rightlist.clientHeight,
        { lindex, rindex } = this.list,
        indexCount = lindex + rindex;
      if (indexCount >= this.data.length) {
        // this.loadflag = false;
        // this.$toast("已经没有更多咯~");
      } else {
        if (left_hei > righ_hei) {
          this.list.right.push(this.data[indexCount]);
          this.list.rindex++;
        } else {
          this.list.left.push(this.data[indexCount]);
          this.list.lindex++;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.ad-waterfall {
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .left-cloumn,
  .right-cloumn {
    flex: 1;
    height: -webkit-fit-content;
    overflow: hidden;
  }
  .left-cloumn {
    margin-left: 10px;
    margin-right: 5px;
  }
  .right-cloumn {
    margin-left: 5px;
    margin-right: 10px;
  }
}
</style>
