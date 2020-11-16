<template>
  <div class="dj-detail-show">
    <div v-loading="!loadFlag">
      <div class="_header">
        <b>共{{programs.length}}期</b>
        <span class="_header-sort" @click="sort.reverse=!sort.reverse">
          <i class="van-icon van-icon-down" :class="{'sort-active':!sort.reverse}"></i>排序
        </span>
      </div>
      <div class="_contain">
        <div class="_contain-item" v-for="item in curPrograms" :key="item.id">
          <label>{{item.index}}</label>
          <div class="_contain-item-info">
            <p class="text-truncate">{{item.name}}</p>
            <div>
              <a>{{item.createTime | toMonDay}}</a>
              <a>
                <i class="van-icon van-icon-play-circle-o"></i> 38.1w
              </a>
              <a>
                <i class="van-icon van-icon-clock-o"></i>
                {{item.duration | toMinute}}分钟+
              </a>
            </div>
          </div>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { djProgram } from "apis/dj";
export default {
  name: "djdetailshow",
  data() {
    return {
      programs: [],
      loadFlag: false,
      sort: {
        reverse: true
      }
    };
  },
  computed: {
    pageId() {
      return this.$route.query.id;
    },
    curPrograms() {
      let { programs } = this;
      return this.sort.reverse ? programs.reverse() : programs.reverse();
    }
  },
  filters: {
    toMinute(val) {
      return Math.floor((val / 1000 / 60) << 0);
    },
    toMonDay(val) {
      let date = new Date(val),
        mon = (date.getMonth() + 1).toString().padStart(2, 0),
        day = date
          .getDate()
          .toString()
          .padStart(2, 0);
      return `${mon}-${day}`;
    }
  },
  mounted() {
    this.mainRequset();
  },
  methods: {
    mainRequset() {
      djProgram(this.pageId).then(res => {
        this.programs = res.data.programs.map((item, index) => ({
          ...item,
          index: index + 1
        }));
        this.loadFlag = true;
      });
    }
  }
};
</script>

<style scoped lang="less">
.dj-detail-show {
  width: 100%;
  background: #fff;
  ._header {
    display: grid;
    grid-template-columns: 1fr 40px;
    margin: 0 16px;
    height: 40px;
    b {
      align-self: center;
      font-size: 14px;
    }
    ._header-sort {
      align-self: center;
      justify-self: flex-end;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #717171;
      i {
        margin-right: 2px;
        transition: all 0.3s;
        &.sort-active {
          transform: rotate(180deg);
        }
      }
    }
  }
  ._contain {
    width: 100%;
    ._contain-item {
      display: grid;
      grid-template-columns: 12vw 1fr 40px;
      padding: 10px 0;
      width: 100%;
      height: 10vw;
      user-select: none;
      &:active {
        background: rgba(0, 0, 0, 0.2);
      }
      label {
        align-self: center;
        justify-self: center;
        color: #707070;
      }
      ._contain-item-info {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          font-size: 14px;
          width: 100%;
        }
        div {
          display: flex;
          align-items: center;
          a {
            display: flex;
            align-items: center;
            font-size: 10px;
            color: #707070;
            margin-right: 14px;
            i {
              margin-right: 2px;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
