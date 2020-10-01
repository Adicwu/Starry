<template>
  <BotLoadAudioList
    class="singer-detail-song"
    type="list"
    :data="artists"
    :perpage="10"
    :isbind="isActive"
    target=".singer-detail"
  >
    <div class="_nav">
      <div>
        <van-icon name="shop-collect-o" />收藏热门50
      </div>
      <span>
        <i class="fa fa-list" aria-hidden="true"></i> 管理
      </span>
    </div>
  </BotLoadAudioList>
</template>

<script>
export default {
  name: "singerdetailsong",
  components: {},
  props: {
    artists: Array
  },
  inject: ["nav"],
  data() {
    return {
      navKey: 1
    };
  },
  computed: {
    isActive() {
      return this.nav.active === this.navKey;
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.singer-detail-song {
  width: 100%;
  ._nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 16px;
    div {
      display: flex;
      align-items: center;
      font-weight: 700;
      i {
        margin-right: 8px;
        font-size: 20px;
      }
    }
    span {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #717171;
      i {
        margin-right: 4px;
        margin-top: 3px;
      }
    }
  }
}
</style>