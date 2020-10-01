<template>
  <li class="privatemsg-item">
    <div class="_cover">
      <img :src="sender.avatarUrl+squareImgSize" v-img-lazyload alt />
    </div>
    <div class="_info">
      <span>{{sender.nickname}}</span>
      <p class="text-truncate">{{detail.msg}}</p>
    </div>
    <div class="_else">
      <span>{{info.lastMsgTime|toYd}}</span>
      <div class="_else-tips" v-if="info.newMsgCount>0">{{info.newMsgCount}}</div>
    </div>
  </li>
</template>

<script>
export default {
  name: "PrivateMsgItem",
  props: {
    info: Object
  },
  filters: {
    toYd(val) {
      let date = new Date(val);
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    }
  },
  computed: {
    sender() {
      return this.info.fromUser;
    },
    detail() {
      return JSON.parse(this.info.lastMsg);
    }
  }
};
</script>
<style lang="less" scoped>
.privatemsg-item {
  position: relative;
  display: grid;
  grid-template-columns: 48px 1fr 40px;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 6px 16px;
  &:active {
    background: rgba(0, 0, 0, 0.1);
  }
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 56px;
    width: calc(100% - 56px);
    height: 1px;
    background: #eee;
    transform: scaleY(0.5);
  }
  ._cover {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #def;
    border-radius: 50%;
  }
  ._info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    padding-left: 10px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    span {
      font-size: 14px;
    }
    p {
      font-size: 10px;
      color: #777;
    }
  }
  ._else {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    span {
      font-size: 8px;
      color: #666;
    }
    ._else-tips {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 12px;
      height: 12px;
      background: crimson;
      font-size: 9px;
      color: #fff;
      border-radius: 50%;
      margin-top: 4px;
    }
  }
}
</style>