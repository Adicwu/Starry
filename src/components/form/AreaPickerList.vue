<template>
  <div class="area-picker-list" @click="handler" ref="contain">
    <label for>{{ title }}</label>
    <p>{{ curText }}</p>
    <MovableMask get-container="#app" position="bottom" v-model="area.flag" v-prevent-back="close">
      <van-area
        style="width: 100%;"
        title="请选择省市"
        :value="dfText"
        :area-list="area.list"
        :columns-num="2"
        @confirm="onConfirm"
      />
    </MovableMask>
  </div>
</template>

<script>
import MovableMask from "../common/MovableMask";
import Areas from "static/area";
export default {
  name: "areapickerlist",
  components: {
    MovableMask
  },
  props: {
    title: String,
    province: Number,
    city: Number
  },
  data() {
    return {
      area: {
        flag: false,
        val: "",
        list: Areas
      }
    };
  },
  computed: {
    curText() {
      let { list } = this.area,
        city_txt = list.city_list[this.city],
        province_txt = list.province_list[this.province];
      return `${province_txt} ${city_txt}`;
    },
    dfText() {
      return this.city.toString();
    }
  },
  methods: {
    onConfirm(val) {
      this.area.flag = false;
      this.$emit("update:province", Number(val[0].code));
      this.$emit("update:city", Number(val[1].code));
    },
    handler() {
      this.area.flag = true;
    },
    close() {
      this.area.flag = false;
    }
  }
};
</script>

<style lang="less" scoped>
.area-picker-list {
  position: relative;
  display: grid;
  grid-template-columns: 120px 1fr;
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
  &:active {
    background: rgba(0, 0, 0, 0.1);
  }
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 16px;
    display: block;
    width: calc(100% - 16px);
    height: 1px;
    background: #e6e6e6;
    transform: scaleY(0.5);
  }
  label {
    align-self: center;
  }
  p {
    width: 100%;
    height: 100%;
    text-align: right;
    color: #777;
    font-size: 14px;
  }
}
</style>
