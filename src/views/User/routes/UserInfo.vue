<template>
  <div class="user-info">
    <BreakHeader title="我的资料" color="#000" />
    <div class="user-info-block" v-if="flags.load">
      <AvatarList title="头像" v-model="avatar.path" />
      <EditInputList title="昵称" v-model="form.nickname" />
      <RadioList title="性别" :list="selector.gender" v-model="form.gender" />
    </div>
    <div class="user-info-block" v-if="flags.load">
      <DatePickerList title="生日" v-model="form.birthday" />
      <AreaPickerList title="地区" :province.sync="form.province" :city.sync="form.city" />
    </div>
    <div class="user-info-block" v-if="flags.load">
      <TextAreaList title="签名" v-model="form.signature" />
    </div>
  </div>
</template>

<script>
import { userDetail, userUpdate } from "apis/user";
import EditInputList from "comps/form/EditInputList";
import RadioList from "comps/form/RadioList";
import DatePickerList from "comps/form/DatePickerList";
import AreaPickerList from "comps/form/AreaPickerList";
import TextAreaList from "comps/form/TextAreaList";
import AvatarList from "comps/form/AvatarList";
export default {
  name: "userinfo",
  components: {
    EditInputList,
    RadioList,
    DatePickerList,
    AreaPickerList,
    TextAreaList,
    AvatarList
  },
  data() {
    return {
      avatar: {
        path: ""
      },
      form: {
        gender: 0,
        birthday: 0,
        nickname: "",
        province: 0,
        city: 0,
        signature: ""
      },
      selector: {
        gender: ["保密", "男", "女"]
      },
      flags: {
        load: false
      },
      counts: {
        request: 0
      }
    };
  },
  watch: {
    form: {
      deep: true,
      handler(val) {
        this.counts.request > 0 && this.updateInfo();
        this.counts.request++;
      }
    }
  },
  computed: {
    userId() {
      return this.$route.query.id;
    }
  },
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      userDetail(this.userId).then(res => {
        this.dataInit(res.data.profile);
        this.flags.load = true;
      });
    },
    dataInit(val) {
      Object.keys(this.form).forEach(item => {
        this.form[item] = val[item];
      });
      this.avatar.path = val.avatarUrl;
    },
    updateInfo() {
      let { cookie } = this.$store.state.user;
      let key = {
        ...this.form
      };
      userUpdate(key).then(res => {
        this.$toast("修改成功~");
      });
    }
  }
};
</script>
<style lang="less" scoped>
.user-info {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: #fff;
  .user-info-block {
    width: 100%;
    border-top: 8px solid #eee;
  }
}
</style>
