<template>
  <div class="home-search-mix" v-if="flags.load" @scroll="mainScroll">
    <div class="_song" v-if="flags.lazy>=1">
      <div class="_title">单曲</div>
      <SearchAudioItem v-for="(item,index) in song.songs" :key="index" :detail="item" />
      <div class="_more" @click="navHanlder(1)">查看更多{{keyword}}的歌曲 ></div>
    </div>
    <div class="_video" v-if="flags.lazy>=2">
      <div class="_title">视频</div>
      <SearchVideoList v-for="(item,index) in video.videos" :key="index" :info="item" />
      <div class="_more" @click="navHanlder(2)">{{video.moreText}} ></div>
    </div>
    <div class="_songlist" v-if="flags.lazy>=3">
      <div class="_title">歌单</div>
      <SonglistItem
        v-for="(item,index) in playList.playLists"
        :key="index"
        :cover="item.coverImgUrl"
        :title="item.name"
        :id="item.id"
      >{{item.trackCount}}首 by {{item.creator.nickname}} ，播放{{item.playCount|numFormat}}次</SonglistItem>
      <div class="_more" @click="navHanlder(3)">{{playList.moreText}} ></div>
    </div>
    <div class="_mlog" v-if="flags.lazy>=4">
      <div class="_title">Mlog</div>
      <div class="_mlog-contain">
        <SearchMlogItem v-for="(item,index) in mlog.mlogs" :key="index" :info="item" />
      </div>
      <div class="_more" @click="navHanlder(4)">{{mlog.moreText}} ></div>
    </div>
    <div class="_singer" v-if="flags.lazy>=5">
      <div class="_title">歌手</div>
      <ArtistItem v-for="(item,index) in artist.artists" :key="index" :detail="item" />
      <div class="_more" @click="navHanlder(5)">{{artist.moreText}} ></div>
    </div>
    <div class="_album" v-if="flags.lazy>=6">
      <div class="_title">专辑</div>
      <AlbumList v-for="(item,index) in album.albums" :key="index" :info="item" />
      <div class="_more" @click="navHanlder(6)">{{album.moreText}} ></div>
    </div>
    <div class="_dj" v-if="flags.lazy>=7">
      <div class="_title">电台</div>
      <DjradioItem v-for="(item,index) in djRadio.djRadios" :key="index" :info="item" />
      <div class="_more" @click="navHanlder(7)">{{djRadio.moreText}} ></div>
    </div>
    <div class="_user" v-if="flags.lazy>=8">
      <div class="_title">用户</div>
      <UserItem v-for="(item,index) in user.users" :key="index" :detail="item" />
      <div class="_more" @click="navHanlder(8)">{{user.moreText}} ></div>
    </div>
  </div>
</template>

<script>
import { mixSearch } from "apis/else";
import { throttles, debounces } from "@/utils/Decorator";
import SearchAudioItem from "comps/item/SearchAudioItem";
import SearchVideoList from "comps/card/SearchVideoList";
import SearchMlogItem from "comps/item/SearchMlogItem";
import SonglistItem from "comps/item/SonglistItem";
import ArtistItem from "comps/item/ArtistItem";
import AlbumList from "comps/card/AlbumList";
import DjradioItem from "comps/item/DjradioItem";
import UserItem from "comps/item/UserItem";

export default {
  name: "homesearchmix",
  components: {
    SearchAudioItem,
    SearchVideoList,
    SonglistItem,
    ArtistItem,
    AlbumList,
    DjradioItem,
    UserItem,
    SearchMlogItem
  },
  props: {
    keyword: String,
    navHanlder: Function
  },
  data() {
    return {
      navKey: 0,
      album: {},
      artist: {},
      djRadio: {},
      mlog: {},
      playList: {},
      song: {
        songs: []
      },
      talk: {},
      user: {},
      video: {},
      flags: {
        load: false,
        lazy: 1
      }
    };
  },
  computed: {
    isActive() {
      return this.nav.active === this.navKey;
    }
  },
  mounted() {
    this.mainRequset();
  },
  methods: {
    mainRequset() {
      Promise.all([
        mixSearch(this.keyword, 1018, 30),
        mixSearch(this.keyword, 1, 18)
      ]).then(res => {
        this.initData(res[0].data.result);
        this.song.songs = res[1].songs;
        this.flags.load = true;
      });
    },
    initData(res) {
      let orders = [
        "video",
        "playList",
        "mlog",
        "talk",
        "artist",
        "album",
        "djRadio",
        "user"
      ];
      // res.order
      orders.forEach(item => {
        this[item] = res[item];
      });
    },
    @throttles(30)
    mainScroll(e) {
      let { scrollHeight, clientHeight, scrollTop } = e.target;
      let distance = parseInt(scrollHeight - clientHeight);
      let sctop = parseInt(scrollTop + 200);
      if (sctop <= distance + 200 && distance <= sctop) this.loadMore();
    },
    @debounces(60)
    loadMore() {
      if (this.flags.lazy < 9) {
        this.flags.lazy++;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.home-search-mix {
  width: 100%;
  height: 100%;
  overflow: scroll;
  & > div {
    width: 100%;
    ._title {
      font-weight: 800;
      margin: 16px;
    }
    ._more {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin: 20px 0;
      font-size: 12px;
      color: #999;
    }
    &._user {
      margin-bottom: 140px;
    }
    &._mlog {
      ._mlog-contain {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}
</style>