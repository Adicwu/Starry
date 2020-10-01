<template>
  <div class="mymusic">
    <b>我的音乐</b>
    <Scroll scrollX bounce class="mymusic-contain" v-if="loadflag">
      <div class="mymusic-item" @click="toMainDetail">
        <ImgLoader class="_cover" :src="list.like.cover+imgSize" />
        <van-icon name="like" />
        <span>我喜欢的音乐</span>
      </div>
      <div class="mymusic-item">
        <ImgLoader class="_cover" :src="list.fm.cover+imgSize" />
        <van-icon name="shop-collect" />
        <span>私人FM</span>
      </div>
      <div class="mymusic-item">
        <ImgLoader class="_cover" :src="list.rmd.cover+imgSize" />
        <van-icon name="new" />
        <span>推荐最新音乐</span>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { userPlaylist, personalFm } from "apis/user";
import { rmdNewsSong } from "apis/song";
export default {
  name: "mymusic",
  inject: ["user"],
  data() {
    return {
      list: {
        like: {
          cover: "",
          id: 0
        },
        fm: {
          cover: "",
          id: 0
        },
        rmd: {
          cover: "",
          id: 0
        }
      },
      loadflag: false,
      imgSize: "?param=225y300"
    };
  },
  computed: {},
  mounted() {
    this.mainRequset();
  },
  methods: {
    mainRequset() {
      Promise.all([
        userPlaylist(this.user.userid),
        personalFm(),
        rmdNewsSong()
      ]).then(arr => {
        this.likeListHandler(arr[0].data.playlist[0]);
        this.list.fm.cover = arr[1].data.data[0].album.picUrl;
        this.list.rmd.cover = arr[2].data.result[0].picUrl;
        this.loadflag = true;
      });
    },
    likeListHandler(val) {
      this.list.like.cover = val.coverImgUrl;
      this.list.like.id = val.id;
    },
    toMainDetail() {
      this.toMainPage("/home/songdetail", this.list.like.id);
    }
  }
};
</script>

<style lang="less" scoped>
.mymusic {
  margin-top: 20px;
  width: 100%;
  height: 200px;

  b {
    padding-left: 16px;
  }

  .mymusic-contain {
    margin-top: 20px;

    .mymusic-item {
      position: relative;
      float: left;
      margin-left: 16px;
      display: inline-flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      width: 120px;
      height: 160px;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 8px;
      overflow: hidden;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 60px;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.4)
        );
        z-index: 2;
      }

      ._cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      i {
        font-size: 30px;
        z-index: 3;

        &.van-icon-like {
          color: crimson;
        }
      }

      span {
        margin-top: 5px;
        max-height: 36px;
        overflow: hidden;
        font-size: 0.875rem;
        z-index: 3;
      }

      &:last-child {
        margin-right: 16px;
      }
    }
  }
}
</style>
