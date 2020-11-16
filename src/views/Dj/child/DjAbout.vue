<template>
  <div class="dj-detail-adout">
    <div v-loading="!flags.load">
      <div class="_anchor">
        <p>主播</p>
        <div class="_anchor-info">
          <img
            :src="creator.avatarUrl+squareImgSize"
            alt
            @click="toMainPage('/home/userdetail',creator.userId)"
          />
          <div>
            <p>{{creator.nickname}}</p>
            <span>著名音乐节目主持人</span>
          </div>
          <input type="button" value="关注" />
        </div>
      </div>
      <div class="_info">
        <p>电台内容简介</p>
        <div class="_info-cate">
          分类：
          <span>{{detail.category}}</span>
        </div>
        <div class="_info-desc">{{detail.desc}}</div>
      </div>
      <div class="_comment" v-if="hasHotComment">
        <p>精彩评论</p>
        <ul class="_comment-item">
          <li>
            <!-- <img :src="" alt=""> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { djComment } from "apis/dj";
import { hotComment } from "apis/else";
export default {
  name: "djdetailadout",
  props: {
    detail: Object
  },
  data() {
    return {
      hotComment: [],
      flags: {
        load: false
      }
    };
  },
  computed: {
    pageId() {
      return this.$route.query.id;
    },
    creator() {
      return this.detail.dj;
    },
    hasHotComment() {
      return this.hotComment.length > 0;
    }
  },
  mounted() {
    this.mainRequset();
  },
  methods: {
    mainRequset() {
      djComment(this.pageId).then(res => {
        this.hotComment = res.data.hotComments;
        this.flags.load = true;
      });
    }
  }
};
</script>

<style scoped lang="less">
.dj-detail-adout {
  width: 100%;
  & > div > div {
    padding-top: 10px;
    width: 100%;
    & > p {
      margin: 0 16px;
      font-weight: 800;
      font-size: 14px;
    }
  }
  ._anchor {
    ._anchor-info {
      box-sizing: border-box;
      padding: 0 16px;
      margin-top: 14px;
      width: 100%;
      height: 12vw;
      display: grid;
      grid-template-columns: 12vw 1fr 70px;
      img {
        border-radius: 50%;
      }
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 10px;
        p {
          font-size: 15px;
          margin-bottom: 4px;
          line-height: 14px;
        }
        span {
          font-size: 10px;
          color: #707070;
        }
      }
      input[type="button"] {
        align-self: center;
        justify-self: center;
        width: 54px;
        height: 24px;
        border: 1px solid crimson;
        background: none;
        border-radius: 20px;
        font-size: 12px;
        color: crimson;
      }
    }
  }
  ._info {
    margin-top: 20px;
    font-size: 12px;
    ._info-cate {
      display: flex;
      align-items: center;
      margin: 10px 16px;
      color: #777;
      span {
        display: block;
        font-size: 8px;
        padding: 1px 2px;
        border: 1px solid crimson;
        border-radius: 4px;
      }
    }
    ._info-desc {
      color: #777;
      margin: 0 16px;
    }
  }
  ._comment {
    ._comment-item {
      margin-top: 20px;
      width: 100%;
      li {
        width: 100%;
        display: grid;
        grid-template-columns: 30px 1fr;
      }
    }
  }
}
</style>
