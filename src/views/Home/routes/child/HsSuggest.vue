<template>
  <ul class="home-search__suggest" v-show="hasList">
    <li v-for="item in curList" :key="item.id" @click="itemClick(item.keyword)">
      <i class="fa fa-search"></i>
      <p v-html="item.dom"></p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "HsSuggest",
  props: {
    list: {
      type: Array,
      default: []
    },
    searchKey: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    curList() {
      let { list, searchKey } = this;
      if (list.length === 0) return [];
      return list.map((item, index) => {
        item.dom = item.keyword.replace(searchKey, `<a>${searchKey}<\/a>`);
        item.id = index;
        return item;
      });
    },
    hasList() {
      return this.list.length > 0;
    }
  },
  methods: {
    itemClick(key) {
      this.$emit("suggestClick", key);
    }
  }
};
</script>
<style lang="less">
.home-search__suggest {
  padding-top: 16px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  & > li {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    color: #717171;
    font-size: 14px;
    &:active {
      background: rgba(0, 0, 0, 0.1);
    }
    i {
      color: rgba(0, 0, 0, 0.2);
      margin-right: 8px;
    }
    p {
      a {
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
}
</style>