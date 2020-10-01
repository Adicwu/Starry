<template>
  <div class="dj-rmd-block">
    <div class="_title">
      <span>
        {{ title }}
        <i class="van-icon van-icon-arrow"></i>
      </span>
    </div>
    <Scroll scrollX bounce class="_contain">
      <div class="_contain-item" v-for="(item, index) in curList" :key="item.id">
        <div class="_cover" ref="cover" @click.stop="toMain($event,item.id)">
          <img :src="item.picUrl+squareImgSize" alt v-img-loader/>
          <span @click="changeMusic(item, index)">
            <i
              class="fa"
              :class="[curMusicId != item.id || !curMusicStatus ? 'fa-play' : 'fa-pause']"
            ></i>
            9.4w
          </span>
        </div>
        <div class="_info">
          <p>{{ item.name }}</p>
          <span>{{ item.dj.nickname }}</span>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { rmdDj, djProgram } from "apis/dj";
export default {
  name: "djrmdblock",
  props: {
    type: Number,
    title: String
  },
  data() {
    return {
      list: [],
      loadFlag: false
    };
  },
  computed: {
    curList() {
      return this.list.slice(0, 8);
    },
    curMusicId() {
      let { curMusic } = this.$store.getters;
      return typeof curMusic === "undefined" ? 0 : curMusic.id;
    },
    curMusicStatus() {
      return this.$store.state.music.status;
    }
  },
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      rmdDj(this.type).then(res => {
        this.list = res.data.djRadios;
        this.loadFlag = true;
      });
    },
    changeMusic(item, index) {
      let { id } = item;
      if (this.curMusicId === id) {
        return this.$store.commit("musicPlay");
      }
      djProgram(id).then(res => {
        let list = res.data.programs.map(item => ({ id: item.mainSong.id }));
        let obj = { list, id, index: 0 };
        this.$store.dispatch("changeCurMusic", obj);
      });
    },
    toMain(e, id) {
      let query = {
        id,
        cover: e.target.getBoundingClientRect()
      };
      this.$router.push({
        path: "/home/djdetail",
        query
      });
    }
  }
};
</script>

<style scoped lang="less">
.dj-rmd-block {
  margin: 20px 0;
  ._title {
    margin: 0 16px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      display: flex;
      align-items: center;
      font-weight: 800;
      i {
        margin-left: 3px;
      }
    }
  }
  ._contain {
    margin-top: 10px;
    width: 100%;
    & /deep/ .content {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1f);
      width: 133vw;
      height: 100%;
      padding: 0 8px;
      box-sizing: border-box;
    }
    ._contain-item {
      margin: 0 10px;
      height: 48vw;
      ._cover {
        position: relative;
        width: 100%;
        padding: 50% 0;
        background: #def;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
        span {
          position: absolute;
          padding: 6px 8px;
          left: 0;
          bottom: -10px;
          border-radius: 23px;
          background: rgba(0, 0, 0, 0.8);
          color: #fff;
          font-size: 10px;
          i {
            margin-right: 3px;
            width: 10px;
          }
        }
      }
      ._info {
        margin-top: 14px;
        p {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.9);
        }
        span {
          font-size: 11px;
          color: #707070;
        }
      }
    }
  }
}
</style>
