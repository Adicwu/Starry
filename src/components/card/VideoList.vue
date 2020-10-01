<template>
  <li class="video-list" ref="contain" @click="toMain">
    <div class="_cover" ref="cover">
      <img :src="info.imgurl+rectangleImgSize" alt v-img-lazyload/>
    </div>
    <div class="_info">
      <p class="text-truncate">{{info.name}}</p>
      <span>{{info.publishTime|toPoint}}</span>
    </div>
  </li>
</template>

<script>
export default {
  name: "videolist",
  props: {
    info: Object
  },
  filters: {
    toPoint(val) {
      return val.replace(/\-/g, ".");
    }
  },
  methods: {
    toMain() {
			let { cover, contain } = this.$refs,
				query = {
					id: this.info.id,
					cover: cover.getBoundingClientRect(),
					contain: contain.getBoundingClientRect()
				};
			this.$router.push({
				path: '/home/mvdetail',
				query
			});
		}
  }
};
</script>
<style lang="less" scoped>
.video-list {
  display: grid;
  grid-template-columns: 30vw 1fr;
  box-sizing: border-box;
  padding: 4px 16px;
  width: 100%;
  height: 20vw;
  &:active {
    background: rgba(0, 0, 0, 0.1);
  }
  ._cover {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
    background: #def;
  }
  ._info {
    box-sizing: border-box;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
	overflow: hidden;
    p {
      font-size: 16px;
      color: #333;
      margin-bottom: 4px;
    }
    span {
      font-size: 10px;
      color: #999;
    }
  }
}
</style>