<template>
  <li class="search-video-list" ref="contain" @click="toMain">
    <div class="_cover" ref="cover">
      <img
        :src="info.coverUrl + rectangleImgSize"
        v-if="info.coverUrl"
        alt
        v-img-lazyload
      />
    </div>
    <div class="_info">
      <p class="text-truncate">{{ info.title }}</p>
      <span>
        {{ info.durationms | toMs }}
        <a :class="{ _active: info.type === 0 }">{{ creatorName }}</a>
      </span>
    </div>
  </li>
</template>

<script>
export default {
  name: "searchvideolist",
  props: {
    info: Object,
  },
  data() {
    return {
      imgSize: "?param=533y300",
    };
  },
  filters: {
    toMs(val) {
      let date = new Date(val),
        min = date.getMinutes().toString().padStart(2, 0),
        seconds = date.getSeconds().toString().padStart(2, 0);
      return `${min}:${seconds}`;
    },
  },
  computed: {
    creatorName() {
      let { creator, type } = this.info;
      return type === 0 ? creator[0].userName : `by ${creator[0].userName}`;
    },
  },
  methods: {
    toMain() {
      // let { cover, contain } = this.$refs,
      //   query = {
      //     id: this.info.id,
      //     cover: cover.getBoundingClientRect(),
      //     contain: contain.getBoundingClientRect()
      //   };
      // this.$router.push({
      //   path: "/home/mvdetail",
      //   query
      // });
    },
  },
};
</script>
<style lang="less" scoped>
.search-video-list {
  display: grid;
  grid-template-columns: 30vw 1fr;
  box-sizing: border-box;
  padding: 4px 16px;
  width: 100%;
  height: 20vw;
  &:active {
    background: rgba(0, 0, 0, 0.1);
  }
  ._cover {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
    background: #def;
    img {
      width: 100%;
      height: 100%;
    }
  }
  ._info {
    box-sizing: border-box;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    p {
      font-size: 16px;
      color: #333;
      margin-bottom: 4px;
    }
    span {
      font-size: 12px;
      color: #999;
      ._active {
        color: darkcyan;
      }
    }
  }
}
</style>