<template>
  <div class="tab-player-tools">
    <van-icon
      class="_items"
      v-for="(item,index) in items"
      :key="index"
      :name="item.icon"
      @click.stop="fnHanlder(item.fn)"
    />
  </div>
</template>

<script>
export default {
  name: "TpTools",
  props: {
    song: Object
  },
  data() {
    return {
      items: [
        {
          icon: "like-o",
          fn: "df"
        },
        {
          icon: "share",
          fn: "df"
        },
        {
          icon: "down",
          fn: "df"
        },
        {
          icon: "chat-o",
          fn: "toComment"
        },
        {
          icon: "ellipsis",
          fn: "df"
        }
      ]
    };
  },
  computed: {},
  mounted() {},
  methods: {
    fnHanlder(key) {
      this.$parent.close();
      return this[key]();
    },
    toComment() {
      let { id = 0 } = this.song;
      if (id === 0) return;
      this.$router.push(`/home/songcomment?id=${id}`);
    },
    df() {}
  }
};
</script>
<style lang="less" scoped>
.tab-player-tools {
  display: flex;
  justify-content: space-between;
  width: 100%;
  ._items {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 10px;
  }
}
</style>