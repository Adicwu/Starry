<template>
  <div
    class="crowd-card"
    ref="contain"
    :class="{ _active: anmflag }"
    @click="crowd"
    @mouseleave="anmflag = false"
  >
    <div class="_cover" :class="{ '_cover-active': anmflag }">
      <img :src="cover" v-img-lazyload alt />
    </div>
    <div class="_header" :class="{ '_header-active': anmflag }">
      <h4></h4>
      <p>
        <a></a>
        <span></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "crowd-card",
  data() {
    return {
      anmflag: false
    };
  },
  props: {
    cover: String
  },
  watch: {
    anmflag(val) {
      if (val) {
        this.dfBreak();
        this.scrollHandle();
      }
      this.childFade();
    }
  },
  methods: {
    crowd() {
      this.anmflag = !this.anmflag;
    },
    scrollHandle() {
      let dom = this.$refs.contain;
      let fa_child = dom.parentNode.children;
      let index = Array.from(fa_child).indexOf(dom);
      if (index === 0) {
        dom.parentNode.scrollTop = 0;
      } else if (index === fa_child.length - 1) {
        dom.parentNode.scrollTop =
          dom.parentNode.scrollHeight - dom.parentNode.offsetHeight;
      } else {
        dom.parentNode.scrollTop =
          index * 196 + 16 - (window.innerHeight - 450) / 2;
      }
    },
    childFade() {
      let prev_dom = this.$refs.contain.previousElementSibling;
      let next_dom = this.$refs.contain.nextElementSibling;
      if (prev_dom != null) {
        this.anmflag
          ? prev_dom.classList.add("fade-out-up")
          : prev_dom.classList.remove("fade-out-up");
      }
      if (next_dom != null) {
        this.anmflag
          ? next_dom.classList.add("fade-out-down")
          : next_dom.classList.remove("fade-out-down");
      }
    },
    dfBreak() {
      window.history.pushState(null, null, document.URL);
      window.onpopstate = this.crowd;
    }
  }
};
</script>

<style lang="less" scoped>
.crowd-card {
  position: relative;
  width: calc(100% - 32px);
  height: 180px;
  margin: 0 16px;
  margin-top: 16px;
  overflow: hidden;
  border-radius: 6px;
  transition: all 0.3s, transform 0.6s;
  background: #fff;
  opacity: 1;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  &.fade-out-up {
    opacity: 0;
    transform: translateY(-100%);
  }
  &.fade-out-down {
    opacity: 0;
    transform: translateY(100%);
  }
  &:last-child {
    margin-bottom: 160px;
  }
  &._active {
    height: 450px;
  }
  ._cover {
    width: 100%;
    height: 180px;
    background: silver;
    transition: all 0.3s;
    &._cover-active {
      height: 240px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  ._header {
    width: 100%;
    box-sizing: border-box;
    padding: 14px;
    opacity: 0;
    transition: all 0.6s;
    transform: translateY(40px);
    &._header-active {
      opacity: 1;
      transform: translateY(0);
    }
    h4 {
      width: 60%;
      height: 24px;
      border-radius: 14px;
      background: crimson;
    }
    p {
      width: 100%;
      height: 16px;
      margin-top: 14px;
      a {
        float: left;
        width: 80px;
        height: 100%;
        border-radius: 14px;
        background: crimson;
      }
      span {
        float: right;
        width: 40px;
        height: 100%;
        border-radius: 14px;
        background: crimson;
      }
    }
  }
}
</style>
