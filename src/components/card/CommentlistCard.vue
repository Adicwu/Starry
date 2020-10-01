<template>
  <li class="comment-list-card">
    <div class="_avatar" @click="toMainPage('/home/userdetail',info.user.userId)">
      <img :src="info.user.avatarUrl+squareImgSize" v-img-lazyload alt />
    </div>
    <div class="_content">
      <div class="_content-title">
        <div>
          <p>
            {{ info.user.nickname }}
            <a v-if="isAuthor">作者</a>
          </p>
          <span>{{ info.time | msToDate }}</span>
        </div>
        <span>
          <a>{{ info.likedCount }}</a>
          <i class="van-icon van-icon-good-job-o"></i>
        </span>
      </div>
      <div class="_content-text">{{ info.content }}</div>
    </div>
  </li>
</template>

<script>
export default {
  name: "commentlistcard",
  props: {
    info: Object,
    pageId: {
      type: [Number, String],
      default: 0
    }
  },
  filters: {
    msToDate(val) {
      let date = new Date(val);
      return `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日`;
    }
  },
  computed: {
    isAuthor() {
      return this.pageId == this.info.user.userId;
    }
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.comment-list-card {
  display: grid;
  grid-template-columns: 56px 1fr;
  box-sizing: border-box;
  padding: 16px 0 0 16px;
  width: 100%;
  margin-bottom: 4px;
  ._avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  ._content {
    width: 100%;
    height: -webkit-fit-content;
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 16px;
    ._content-title {
      display: grid;
      grid-template-columns: 1fr 60px;
      width: 100%;
      height: 100%;
      & > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        p {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #656565;
          margin-bottom: 2px;
          a {
            font-size: 6px;
            color: crimson;
            background: pink;
            padding: 1px 2px;
            border-radius: 2px;
            margin-left: 4px;
          }
        }
        span {
          font-size: 10px;
          color: #969696;
        }
      }
      & > span {
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: flex-start;
        font-size: 10px;
        color: #999999;
        i {
          margin-left: 2px;
          margin-top: -3px;
          font-size: 14px;
        }
      }
    }
    ._content-text {
      box-sizing: border-box;
      padding-right: 16px;
      margin-top: 6px;
      width: 100%;
      font-size: 14px;
    }
  }
}
</style>
