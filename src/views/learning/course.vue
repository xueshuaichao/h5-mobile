<template>
  <div class="course-detail">
    <van-nav-bar :title="course.title" left-arrow @click-left="back" />
    <div class="video">
      <div class="poster">
        <div class="play"></div>
      </div>
<!--  <video src="https://www.runoob.com/try/demo_source/movie.mp4" playsinline controls></video>-->
    </div>
    <van-tabs v-model="tabIndex" class="tabs" color="#30BA8B">
      <van-tab title="目录">
        <div class="flex-wrap">
          <span>学习总进度{{ progress }}%</span>
          <div class="progress">
            <div class="progress-inner" :style="{ width: progress + '%' }" />
              <!-- <div v-if="progress > 20">已学{{ progress }}%</div> -->
          </div>
        </div>
        <div class="chapters">
          <div class="line" />
          <div
            v-for="(item, index) in course.chapters"
            :key="item.id"
            class="level1"
            :class="{ ended: index > 0}"
          >
            <p>{{ item.title }}</p>
            <ul class="level2">
              <li 
                v-for="chapter in item.children"
                :key="chapter.id"
                :class="{ ended: chapter.progress == 100, started: chapter.progress > 0}"
              >
                <div class="wrap">
                  <van-icon :name="mapIcon(chapter.type)" />
                  <span class="title">{{ chapter.title }}</span>
                  <span v-if="chapter.progress > 0" class="green fr">{{ chapter.progress }}%</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </van-tab>
      <van-tab title="简介">
        <div style="padding: 0 16px;font-size: 14px;">
          <p>本课程紧跟企业人力资源岗位需求，高效构建HR所需的知识体系和专业能力。</p>
          <p>通过本课程的学习，学员能够正确理解人力资源管理的概念，掌握人力资源管理的主要职能，并能综合用于对实际问题的分析与解决，培养并提高他们在人力资源管理领域的实操能力。</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { chapters } from '../../data/course';
export default {
  data() {
    return {
      tabIndex: 0,
      course: {
        title: '钢筋现场验收重点',
        cover: '',
        chapters,
        desc: '',
      },
      progress: 38
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    mapIcon(type) {
      const map = {
        'video': 'video',
        'live': 'live',
        'homework': 'gem',
        'doc': 'todo-list'
      };
      return map[type] || 'video';
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../variables.less';
.course-detail {
  text-align: left;
  background: #F5F5FA;
}
.video{
  width: 100%;
  height: 192px;

  .poster{
    background: url('../../assets/livebg@2x.png');
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: contain;
    height: 100%;

    .play{
      width: 50px;
      height: 50px;
      background: url('../../assets/videoPlay@2x.png');
      background-size: contain;
    }
  }

  video{
    width: 100%;
    height: 100%;
  }
}
.tabs {
  background: #fff;
}
.flex-wrap {
  display: flex;
  margin: 16px;
  font-size: 13px;
}
.progress {
  flex: 1;
  width: 80%;
  margin-top: 4px;
  margin-left: 14px;
  background: #C5EAE2;
  height: 12px;
  font-size: 12px;
  line-height: 1;
  border-radius: 6px;
  text-align: center;
  .progress-inner {
    height: 100%;
    background: @green;
    border-radius: 6px;
    color: @white;
    overflow: hidden;
    white-space: nowrap;
  }
}
.chapters {
  position: relative;
  padding: 0 16px;
  font-size: 12px;
  .line {
    position: absolute;
    width: 0;
    left: 19px;
    top: 7px;
    bottom: 7px;
    border: 1px dashed #30BA8B;
    transform: scaleX(0.6);
  }
  .level1 {
    position: relative;
    padding-left: 20px;
    font-size: 16px;
    &::before {
      position: absolute;
      width: 8px;
      height: 8px;
      left: 0;
      top: 7px; 
      border-radius: 50%;
      background: @green;
      content: ' ';
      z-index: 10;
    }
  }
  .ended::before {
    background: @gray-6;
  }
  .level2 {
    font-size: 14px;
    li {
      margin-bottom: 7px;
    }
    .wrap {
      display: flex;
      align-items: center;
    }
    .title {
      flex: 1;
      margin: 0 6px;
    }
    .green {
      color: @green;
    }
    .van-icon {
      vertical-align: middle;
    }
    .ended {
      color: @gray-6;
    }
  }
}
</style>
