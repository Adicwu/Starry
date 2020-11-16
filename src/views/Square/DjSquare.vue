<template>
  <div class="dj-square" @scroll="mainScroll">
    <BreakHeader title="电台广场" color="#000" />
    <DjBanner />

    <div v-for="(cate, index) in categories" :key="index">
      <DjRmdList
        :type="cate[0].id"
        :title="cate[0].name"
        v-if="flags[`block${index}`]"
      />
      <DjRmdBlock
        :type="cate[1].id"
        :title="cate[1].name"
        v-if="flags[`block${index}`]"
      />
    </div>
  </div>
</template>

<script>
import { djTypes } from "apis/dj";
import DjBanner from "./child/DjBanner";
import DjRmdList from "./child/DjRmdList";
import DjRmdBlock from "./child/DjRmdBlock";
import { throttles } from "@/utils/Decorator";
export default {
  name: "djsquare",
  components: {
    DjBanner,
    DjRmdList,
    DjRmdBlock,
  },
  data() {
    return {
      block: 1,
      flags: {
        block1: true,
        block2: false,
        block3: false,
        block4: false,
        block5: false,
        block6: false,
        block7: false,
      },
      categories: [],
    };
  },
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      djTypes().then((res) => {
        this.categories = this.categoriesFormat(res.data.categories);
      });
    },
    categoriesFormat(categories) {
      let list = [];
      for (var i = 0; i < categories.length; i += 2) {
        list.push(categories.slice(i, i + 2));
      }
      return list;
    },
    @throttles(100)
    mainScroll(e) {
      if (this.block === 7) return;
      let { scrollTop, offsetHeight, scrollHeight } = e.target;
      if (scrollTop + offsetHeight + 100 > scrollHeight) {
        this.flags["block" + ++this.block] = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
.dj-square {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 800;
  & > div:last-child {
    margin-bottom: 120px;
  }
}
</style>
