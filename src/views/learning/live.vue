<template>
  <div class="course-detail">
    <van-nav-bar :title="course.title" left-arrow @click-left="back" />
    <div class="player">
      <img class="cover" :src="course.cover" />
    </div>
    <van-tabs v-model="tabIndex" class="tabs">
      <van-tab title="简介">
        <div class="description">
          <p>直播已结束，可观看回放</p>
          <p>直播时间：2020.8.20 12:00</p>
          <br />
          <p>课程简介</p>
          <p>
            钢筋工是指使用工具及机械，对钢筋进行除锈、调直、连接、切断、成型、安装钢筋骨架的人员。该职业共设四个等级，分别为：初级（国家职业资格五级）、中级（国家职业资格四级）、高级（国家职业资格三级）、技师（国家职业资格二级）。该职业要求从业者手指、手臂灵活，具有较好的身体素质。
          </p>
        </div>
      </van-tab>
      <van-tab title="聊天"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabIndex: 0,
      course: {
        title: '钢筋现场验收重点',
        cover: '',
        description: ''
      }
    };
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less">
@import '../../variables.less';
.course-detail {
  text-align: left;
  background: #f4f4f4;
  .player {
    padding: 8px 16px 16px;
  }
  .cover {
    width: 100%;
    height: 70vw;
  }
  .tabs {
    background: #fff;
  }
  .description {
    padding: 16px 32px;
  }
}
</style>
