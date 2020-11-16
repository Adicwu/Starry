<template>
  <div class="user-item" @click="toMainPage('/home/userdetail', detail.userId)">
    <img
      :src="detail.avatarUrl + squareImgSize"
      v-if="detail.avatarUrl"
      v-img-lazyload
      alt
    />
    <div class="_info">
      <p class="text-truncate">
        {{ detail.nickname }}
        <i v-if="userGender" :class="userGender"></i>
      </p>
      <a class="text-truncate" v-if="userSays">{{ userSays }}</a>
    </div>
    <div class="_else">
      <span v-if="!followed">+ 关注</span>
      <a v-else></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "useritem",
  props: {
    detail: Object,
    followed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    userSays() {
      let { description, signature } = this.detail;
      return description || signature || false;
    },
    userGender() {
      let key = this.detail.gender;
      switch (key) {
        case 1:
          return "fa fa-mars";
          break;
        case 2:
          return "fa fa-venus";
          break;
        default:
          return false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.user-item {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 40px 1fr 54px;
  width: 100%;
  height: 60px;
  padding: 10px 16px;
  user-select: none;
  &:active {
    background: rgba(0, 0, 0, 0.1);
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #def;
  }
  ._info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-left: 10px;
    box-sizing: border-box;
    p {
      align-self: center;
      width: 100%;
      overflow: hidden;
      font-size: 14px;
      .fa-mars,
      .fa-venus {
        font-size: 12px;
        margin-left: 2px;
      }
      .fa-mars {
        color: #28c7b9;
      }
      .fa-venus {
        color: pink;
      }
    }

    a {
      font-size: 10px;
      color: #777;
    }
  }
  ._else {
    justify-self: flex-end;
    align-self: center;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 46px;
      height: 18px;
      border: 1px solid crimson;
      border-radius: 14px;
      color: crimson;
      font-size: 10px;
    }
  }
}
</style>