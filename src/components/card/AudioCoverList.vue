<template>
  <li class="audio-cover-list" @click="playMusic(info.id)">
    <div class="_cover">
      <img
        :src="info.al.picUrl + squareImgSize"
        v-if="info.al.picUrl"
        alt
        v-img-lazyload
      />
    </div>
    <div class="_info">
      <p class="text-truncate">
        {{ info.name }}
        <a>{{ songNameTns || songNameElse }}</a>
      </p>
      <span class="text-truncate">{{ singerName }}</span>
    </div>
    <span></span>
  </li>
</template>

<script>
export default {
  name: "audiocoverlist",
  props: {
    info: Object,
  },
  computed: {
    singerName() {
      let { ar, al } = this.info;
      return `${ar[0].name} - ${al.name}`;
    },
    songNameTns() {
      let { tns } = this.info;
      return typeof tns != "undefined" ? `(${tns[0]})` : "";
    },
    songNameElse() {
      let { alia } = this.info;
      return alia.length > 0 ? `(${alia[0]})` : "";
    },
  },
  methods: {
    playMusic(id) {
      let key = {
        info: {
          alg: null,
          id,
          v: null,
        },
        obj: {
          list: [],
          id: null,
          index: 0,
        },
      };
      this.$store.dispatch("newMusic", key).then((res) => {
        this.$bus.emit("playerOpen");
      });
    },
  },
};
</script>
<style lang="less" scoped>
.audio-cover-list {
  box-sizing: border-box;
  padding: 8px 16px;
  width: 100%;
  height: 18vw;
  display: grid;
  grid-template-columns: 14vw 1fr 30px;
  &:active {
    background: rgba(0, 0, 0, 0.1);
  }
  ._cover {
    background: #def;
    border-radius: 4px;
    overflow: hidden;
  }
  ._info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    p {
      font-size: 4vw;
      margin-bottom: 3px;
      color: #333;
      a {
        color: #999;
      }
    }
    span {
      font-size: 3vw;
      color: #999;
    }
  }
}
</style>