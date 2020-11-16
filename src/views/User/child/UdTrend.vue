<template>
  <div class="user-detail-trend">
    <div v-loading="!flags.load">
      <div class="_blank" v-if="trends.length === 0">
        可可爱爱，没有动态 O(∩_∩)O ~
      </div>
      <BotLoad
        :data="trends"
        :perpage="3"
        target=".user-detail"
        :isbind="isActive"
        v-else
      >
        <template #contain="{ curdata }">
          <TrendItem v-for="item in curdata" :key="item.id" :info="item" />
        </template>
      </BotLoad>
    </div>
  </div>
</template>

<script>
import { userEvent } from "apis/user";
import TrendItem from "comps/item/TrendItem";
export default {
  name: "userdetailtrend",
  components: {
    TrendItem,
  },
  inject: ["nav"],
  data() {
    return {
      trends: [],
      userId: 0,
      navKey: 1,
      flags: {
        load: false,
      },
    };
  },
  computed: {
    isActive() {
      return this.nav.active === this.navKey;
    },
  },
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      this.userId = this.$route.query.id;
      userEvent(this.userId).then((res) => {
        this.trends = res.data.events.map((item) => ({
          ...item,
          pjson: JSON.parse(item.json),
        }));
        this.flags.load = true;
      });
    },
  },
};
</script>

<style scoped lang="less">
.user-detail-trend {
  width: 100%;
  ._blank {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 110px;
    font-size: 12px;
    color: #777;
  }
}
</style>
