<template>
  <div class="user-detail-home" v-if="flags.load">
    <div class="_banner">
      <div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div>
        <i class="van-icon van-icon-like"></i>
        <span>喜欢的音乐</span>
        <p>{{loveList.trackCount}}首，播放{{loveList.playCount}}次</p>
      </div>
    </div>
    <div class="_title" v-if="createdList.length>0">
      <p>
        <b>创建的歌单</b>
        （{{ createdList.length }}个，被收藏{{userinfo.playlistBeSubscribedCount}}次）
      </p>
      <span @click="toMainPage('/home/userdetail/usersonglist',userId)">更多歌单</span>
    </div>
    <ul class="_contain">
      <SonglistItem
        v-for="item in curCreatedList"
        :cover="item.coverImgUrl"
        :key="item.id"
        :title="item.name"
        :id="item.id"
      >{{ item.trackCount }}首，播放{{ item.playCount | numFormat }}次</SonglistItem>
    </ul>
    <div class="_title" v-if="curFavList.length>0">
      <p>
        <b>收藏的歌单</b>
        （{{ favList.length }}）
      </p>
    </div>
    <ul class="_contain">
      <SonglistItem
        v-for="item in curFavList"
        :cover="item.coverImgUrl"
        :key="item.id"
        :title="item.name"
        :id="item.id"
      >{{ item.trackCount }}首，by{{ item.creator.nickname }}，播放{{ item.playCount | numFormat }}次</SonglistItem>
    </ul>
    <!-- <div class="_title">
			<p>
				<b>评论</b>
				（{{ favList.length }}）
			</p>
			<span>更多评论</span>
		</div>
    <div class="_chat"></div>-->
    <div class="_title">
      <p>
        <b>基本信息</b>
      </p>
      <span>更多信息</span>
    </div>
    <ul class="_contain">
      <li class="_contain-text">村龄：{{ townAge }}年（{{ userinfo.createTime | dateFormat }}注册）</li>
      <li class="_contain-text" v-if="ageRank">年龄：{{ ageRank }} {{ constellation }}</li>
      <!-- <li class="_contain-text">地区： xxxx</li> -->
    </ul>
  </div>
</template>

<script>
import { constellation } from "@/utils/Constellation";
import { userPlaylist } from "apis/user";
import SonglistItem from "comps/item/SonglistItem";
export default {
  name: "userdetailhome",
  components: {
    SonglistItem
  },
  props: {
    userinfo: Object
  },
  data() {
    return {
      list: [],
      userId: 0,
      flags: {
        load: false
      }
    };
  },
  computed: {
    favList() {
      let { list, userId } = this;
      return list.filter(item => item.creator.userId != userId);
    },
    loveList() {
      return this.list[0];
    },
    createdList() {
      let { list, userId } = this;
      return list.filter(item => item.creator.userId == userId);
    },
    curFavList() {
      return typeof this.list !== "undefined" ? this.favList.slice(0, 3) : [];
    },
    curCreatedList() {
      return typeof this.createdList !== "undefined"
        ? this.createdList.slice(1, 5)
        : [];
    },
    townAge() {
      let { createTime } = this.userinfo;
      return new Date().getFullYear() - new Date(createTime).getFullYear();
    },
    ageRank() {
      let { birthday } = this.userinfo;
      if (birthday.toString()[0] === "-") return false;
      return new Date(birthday).getFullYear().toString()[2] + "0后";
    },
    constellation() {
      let { birthday } = this.userinfo;
      if (birthday.toString()[0] === "-") return false;
      let date = new Date(birthday),
        date_count = Number(
          `${date.getMonth() + 1}${date
            .getDate()
            .toString()
            .padStart(2, 0)}`
        );
      return (
        constellation.find(item => {
          let { date } = item,
            isReverse = date[0] > date[1];
          if (!isReverse) {
            return date[0] <= date_count && date_count <= date[1];
          } else {
            return date[1] <= date_count && date_count <= date[0];
          }
        }).text || "未知"
      );
    }
  },
  filters: {
    dateFormat(val) {
      const date = new Date(val);
      return `${date.getFullYear()}年${date.getMonth() + 1}月`;
    }
  },
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      this.userId = this.$route.query.id;
      userPlaylist(this.userId).then(res => {
        this.list = res.data.playlist;
        this.flags.load = true;
      });
    }
  }
};
</script>

<style scoped lang="less">
.user-detail-home {
  width: 100%;
  ._banner {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    height: 50vw;
    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      &:first-child {
        background: linear-gradient(to bottom right, #28c7b9, #19faf2, #6affd3);
        ul {
          height: 70%;
          display: flex;
          align-items: flex-end;
          li {
            width: 14px;
            height: 100%;
            border-radius: 14px;
            margin: 0 8px;
            background: #fff;
            &:first-child {
              height: 80%;
            }
            &:last-child {
              height: 50%;
            }
          }
        }
      }
      &:last-child {
        flex-direction: column;
        background: #def;
        i {
          color: crimson;
          font-size: 16vw;
        }
        span {
          font-size: 14px;
        }
        p {
          font-size: 10px;
          color: #707070;
        }
      }
    }
  }
  ._title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 16px;
    p {
      font-size: 12px;
      color: #707070;
      b {
        font-size: 18px;
        color: #111111;
      }
    }
    span {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 22px;
      border: 1px solid #e6e6e6;
    }
  }
  ._contain {
    ._contain-text {
      margin: 6px 16px;
      font-size: 12px;
      color: #444;
    }
  }
}
</style>
