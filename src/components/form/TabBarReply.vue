<template>
  <div class="tab-bar-reply">
    <div class="_reply">
      <van-field
        rows="1"
        autofocus
        placeholder="写私信..."
        :autosize="{ maxHeight: 72, minHeight: 0 }"
        show-word-limit
        type="textarea"
        class="_reply-textarea"
        v-model="form.val"
      />
      <div class="_reply-tool">
        <i class="fa" :class="[!flags.brow?'fa-smile-o':'fa-keyboard-o']" @click.stop="flags.brow=!flags.brow"></i>
      </div>
      <div class="_reply-tool">
        <van-icon name="photo-o" v-show="!hasVal" />
        <span v-show="hasVal">发送</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarReply",
  components: {},
  props: {},
  data() {
    return {
      form: {
        val: ""
      },
      flags: {
        brow: false
      }
    };
  },
  computed: {
    hasVal() {
      return this.form.val !== "";
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.tab-bar-reply {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0 6px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
  ._reply {
    display: flex;
    ._reply-textarea {
      flex: 1;
    }
    ._reply-tool {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 44px;
      height: 44px;
      font-size: 14px;
      color: #717171;
      i {
        font-size: 26px;
      }
      span {
        font-size: 14px;
      }
    }
  }
}
</style>