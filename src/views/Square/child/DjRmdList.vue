<template>
  <div class="dj-rmd-list">
    <div class="_title">
      <span>
        {{ title }}
        <i class="van-icon van-icon-arrow"></i>
      </span>
    </div>
    <ul class="_contain" v-if="loadFlag">
      <li v-for="(item, index) in curList" :key="item.id" @click="toMain($event,item.id)">
        <div class="_cover" ref="cover">
          <img :src="item.picUrl+squareImgSize" alt v-img-loader />
        </div>
        <div class="_info">
          <p class="text-truncate">{{ item.name }}</p>
          <div>
            <img :src="item.dj.avatarUrl+squareImgSize" alt />
            <a>{{ item.dj.nickname }}</a>
            <span>
              <i class="van-icon van-icon-fire-o"></i>
              102w
            </span>
          </div>
        </div>
        <div class="_control" @click.stop="changeMusic(item, index)">
          <span
            class="fa"
            :class="[curMusicId != item.id || !curMusicStatus ? 'fa-play' : 'fa-pause']"
          ></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { rmdDj, djProgram } from "apis/dj";
export default {
  name: "djrmdlist",
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
      return this.list.slice(0, 4);
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
.dj-rmd-list {
  margin-top: 16px;
  animation-duration: 1.6s;
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
    width: 100%;
    li {
      margin: 10px 0;
      padding: 0 16px;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 16vw 1fr 40px;
      width: 100%;
      height: 16vw;
      &:active {
        background: rgba(0, 0, 0, 0.2);
      }
      ._cover {
        width: 100%;
        height: 100%;
        border-radius: 6px;
        overflow: hidden;
        background: #def;
        img {
          width: 100%;
          height: 100%;
        }
      }
      ._info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 0 10px;
        overflow: hidden;
        p {
          font-size: 15px;
          margin-bottom: 6px;
        }
        div {
          display: flex;
          align-items: center;
          font-size: 13px;
          color: #707070;
          img {
            width: 20px !important;
            height: 20px !important;
            border-radius: 50%;
            margin-right: 6px;
          }
          a {
            max-width: 40%;
            height: 20px;
            overflow: hidden;
          }
          span {
            display: flex;
            align-items: center;
            margin-left: 8px;
            i {
              margin-right: 2px;
            }
          }
        }
      }
      ._control {
        align-self: center;
        justify-self: center;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          width: 26px;
          height: 26px;
          border: 1px solid #999;
          font-size: 12px;
          color: crimson;
          &::before {
            margin-left: 2px;
          }
        }
      }
    }
  }
}
</style>
