<template>
  <div class="singer-detail-home">
    <div v-loading="!flags.load">
      <div class="_hotsong">
        <div class="_title">
          <b class="van-icon van-icon-fire-o">最近热门</b>
          <input type="button" value="更多热歌" @click="changeNav(1)" />
        </div>
        <ul class="_hotsong-contain">
          <AudioCoverList v-for="item in singerMix.hotThree" :info="item" :key="item.id" />
        </ul>
      </div>
      <div class="_singer">
        <div class="_title" v-if="singerMixDesc">
          <b>歌手简介</b>
          <input type="button" value="更多信息" @click="flags.singerMsg=true" />
        </div>
        <div class="_singer-contain">{{singerMixDesc.briefDesc}}</div>
      </div>
      <van-popup
        class="singer-detail-popup"
        v-model="flags.singerMsg"
        round
        closeable
        position="bottom"
        get-container=".singer-detail"
        :style="{height: '70%'}"
        v-prevent-back="closePopup"
        v-if="singerMixDesc"
      >
        <div class="_contain">
          <div>
            <p>{{singerMix.detail.name}}简介</p>
            <div class="singer-more-context">{{singerMixDesc.briefDesc}}</div>
          </div>
          <div v-for="(item,index) in singerMixDesc.introduction" :key="index">
            <p>{{item.ti}}</p>
            <div class="singer-more-context">{{item.txt}}</div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import AudioCoverList from "comps/card/AudioCoverList";
import { singerDesc, singerSimi } from "apis/singer";
export default {
  name: "singerdetailhome",
  components: {
    AudioCoverList
  },
  props: {
    singer: Object,
    changeNav: Function
  },
  data() {
    return {
      singerMix: {
        simi: []
      },
      flags: {
        load: false,
        singerMsg: false
      }
    };
  },
  computed: {
    pageId() {
      return this.$route.query.id;
    },
    singerMixDesc() {
      let val = this.singerMix.desc;
      return val ? val : false;
    }
  },
  mounted() {
    this.mainRequset();
  },
  methods: {
    mainRequset() {
      let { pageId } = this;
      singerSimi(pageId)
        .then(res => {
          this.singerMix = {
            simi: res.data.artists.slice(0, 3),
            ...this.singer
          };
        })
        .catch(err => {
          this.singerMix = {
            ...this.singer
          };
        })
        .finally(() => {
          this.flags.load = true;
        });
    },
    closePopup() {
      this.flags.singerMsg = false;
    }
  }
};
</script>
<style lang="less" scoped>
.singer-detail-home {
  width: 100%;
  ._title {
    display: grid;
    grid-template-columns: 1fr 80px;
    align-items: center;
    margin: 0 16px;
    b {
      display: flex;
      align-items: center;
      height: 100%;
      font-size: 15px;
      line-height: 14px;
      font-weight: 800;
      color: #333;
      &::before {
        margin-right: 4px;
        margin-top: 3px;
      }
    }
    input[type="button"] {
      width: 60px;
      height: 20px;
      background: none;
      border: 1px solid #eee;
      border-radius: 20px;
      font-size: 10px;
      justify-self: flex-end;
    }
  }
  ._hotsong {
    width: 100%;
    padding-top: 16px;
    ._hotsong-contain {
      margin-top: 10px;
    }
  }
  ._singer {
    width: 100%;
    padding-top: 16px;
    ._singer-contain {
      display: -webkit-box !important;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      -webkit-line-clamp: 4;
      overflow: hidden;
      margin: 10px 16px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>