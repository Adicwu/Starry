<template>
  <div class="mv-lg-card" @click="toMain" ref="contain">
    <div class="_header">
      <!-- <AvatarsHandler :avatars="artistsAvatars" width="80px" v-if="artistsAvatars != ''" /> -->
      <div class="_header-info">
        <b ref="singer">{{ info.artistName }}</b>
        <p>{{ fullSingerName }}</p>
      </div>
      <span></span>
    </div>
    <div class="_info">
      <span ref="sname">{{ info.name }}</span>
    </div>
    <div class="_cover" ref="cover">
      <img :src="info.cover+rectangleImgSize" v-img-lazyload alt />
      <van-icon name="play-circle-o" />
    </div>
    <div class="_else">
      <span>
        <van-icon name="fire" />
        {{ info.playCount | numFormat }}+
      </span>
    </div>
  </div>
</template>

<script>
import { artists } from "apis/artists";
import AvatarsHandler from "comps/tool/AvatarsHandler";
export default {
  name: "mvlgcard",
  components: {
    AvatarsHandler
  },
  props: {
    info: Object
  },
  data() {
    return {
      artists: []
    };
  },
  computed: {
    artistsAvatars() {
      return this.artists.map(item => item.picUrl);
    },
    fullSingerName() {
      return this.info.artists.map(item => item.name).join("/");
    }
  },
  mounted() {
    // this.artistsAvatarsHandler();
  },
  methods: {
    artistsAvatarsHandler() {
      this.info.artists.forEach(item => {
        artists(item.id).then(res => {
          this.artists.push(res.data.artist);
        });
      });
    },
    toMain() {
      let { cover, contain } = this.$refs,
        query = {
          id: this.info.id,
          cover: cover.getBoundingClientRect(),
          contain: contain.getBoundingClientRect()
        };
      this.$router.push({
        path: "/home/mvdetail",
        query
      });
    }
  }
};
</script>

<style lang="less" scoped>
.mv-lg-card {
  box-sizing: border-box;
  margin: 0 16px;
  margin-top: 20px;
  background: #14171b;
  color: #fff;
  border-radius: 8px;
  overflow: hidden;
  ._header {
    display: grid;
    // grid-template-columns: 86px 1fr 30px;
    grid-template-columns: 1fr 30px;
    grid-auto-rows: 1fr;
    padding: 16px;
    ._header-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      b {
        font-size: 0.875rem;
      }
      p {
        font-size: 0.625rem;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
  ._info {
    padding: 16px;
    padding-top: 0;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
  }
  ._cover {
    position: relative;
    width: 100%;
    padding-bottom: 50%;
    img {
      position: absolute;
      top: 40%;
      left: 40%;
      width: 20% !important;
      height: 20% !important;
      transform: scale(5);
    }
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 40px;
      color: rgba(255, 255, 255, 0.8);
      transform: translate(-50%, -50%);
    }
  }
  ._else {
    display: flex;
    justify-content: flex-end;
    padding: 16px;
    span {
      display: flex;
      align-items: center;
      i {
        font-size: 0.875rem;
        color: crimson;
        margin-right: 4px;
      }
      font-size: 0.75rem;
    }
  }
}
</style>
