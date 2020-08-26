<template>
  <div class="training-detail">
    <van-nav-bar
      title="培训详情"
      :fixed="true"
      placeholder
      left-arrow
      :border="false"
      right-text="学情报告"
      @click-left="handleClickNavLeft"
      @click-right="handleClickNavRight"
    />
    <div class="bg"></div>

    <!-- <train-item :show-bottom="false" :data="trainItem" class="card" /> -->
    <div class="train-info">
      <div class="title">{{ trainItem.title }}</div>
        <div class="date">
          <van-icon name="clock" style="vertical-align: -2px;" />
          {{ trainItem.date }}
        </div>
        <div class="progress">
          学习进度{{ trainItem.progress }}%
          <van-progress
            :percentage="trainItem.progress"
            :stroke-width="7"
            :show-pivot="false"
            color="#F7A0A0"
          />
          <p style="margin: 10px 0 0">
            已学<span class="em">{{ trainItem.hours }}</span
            >/共{{ trainItem.total_hours }}学时
          </p>
        </div>
    </div>
    <van-tabs v-model="tabIndex" class="tabs" color="#30BA8B">
      <van-tab title="培训内容">
        <div class="course-list">
          <div
            v-for="course in courseList"
            :key="course.id"
            class="course-item van-hairline--bottom"
            @click="toDetail(course)"
          >
            <van-tag class="tag" type="primary" :class="[course.type]">{{ course.tag }}</van-tag>
            <div class="title">{{ course.title }}</div>
            <div class="bottom clearfix">
              <div class="fl">
                <template
                  v-if="course.type === 'course' || course.type === 'homework'"
                >
                  已学<span class="em">{{ course.hours }}</span
                  >课/共{{ course.total_hours }}课
                </template>
                <template v-else>
                  <van-icon name="clock-o" style="vertical-align:middle" />
                  {{ course.date }}
                </template>
              </div>
              <div class="fr">学时: {{ course.time }}</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="互动专区">
        <div class="forum"></div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
const courseList = [
  {
    id: 1,
    type: 'course',
    tag: '课程',
    title: '钢筋现场验收重点',
    hours: 15,
    total_hours: 80,
    time: 0.5
  },
  {
    id: 2,
    type: 'live',
    tag: '直播',
    title: '钢筋原材验收4个要点',
    date: '2020.08.01',
    time: 0.5
  },
  {
    id: 3,
    type: 'homework',
    tag: '作业',
    title: '钢筋连接控制的4个要点',
    hours: 15,
    total_hours: 80,
    time: 0.5
  },
  {
    id: 4,
    type: 'exam',
    tag: '考试',
    title: '钢筋原材验收4个要点',
    date: '2020.08.01',
    time: 0.5
  },
  {
    id: 5,
    type: 'practise',
    tag: '线下实训',
    title: '《建筑施工高处作业安全技术规范》解读',
    date: '2020.08.01 14:00',
    time: 0.5
  }
];

export default {
  data() {
    return {
      tabIndex: 0,
      courseList,
      trainItem: {
        id: '1',
        title: '钢筋工培训班培训 - 第8期',
        date: '2020.08.01~2020.08.30',
        progress: 18,
        hours: 15,
        total_hours: 80,
        current: '课程： 1.2建设工程项目管理',
        state: 'end'
      }
    };
  },
  methods: {
    handleClickNavLeft() {
      this.$router.back(-1);
    },
    handleClickNavRight() {
      console.log('nav-right-click');
    },
    toDetail(course) {
      const map = {
        course: 'courseDetail',
        live: 'liveDetail',
        practise: 'practise',
        exam: 'exam',
        homework: 'homework'
      };
      if (map[course.type]) {
        const location = {
          name: map[course.type],
          params: { id: course.id }
        };
        this.$router.push(location);
        console.log(location);
      } else {
        console.warn(`unreconginze course type "${course.type}"`);
      }
    }
  }
};
</script>

<style lang="less">
@import '../../variables.less';
.training-detail {
  font-size: 12px;
  background: #f4f4f4;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 75vw;
    background:linear-gradient(119deg,rgba(5,202,156,1) 0%,rgba(0,170,130,1) 100%);
  }
  .van-nav-bar {
    background:linear-gradient(119deg,rgba(5,202,156,1) 0%,rgba(0,170,130,1) 100%);
    background-size: 100% 75vw;

    .van-icon,
    .van-nav-bar__title,
    .van-nav-bar__text {
      color: #fff;
    }
  }
 
  .train-info {
    position: relative;
    color: #fff;
    text-align: left;
    padding: 32px 16px 16px;
    font-size: 13px;
    .title {
      font-size: 24px;
      line-height: 1;
      margin: 12px 0;
    }
    .progress {
      margin-top: 15px;
    }
    .van-progress {
      display: inline-block;
      margin-left: 12px;
      width: 90px;
    }
  }
  .tabs {
    background: #fff;
    min-height: 200px;
  }
  .tabs,
  .van-tabs__wrap {
    border-radius: 11px 11px 0 0;
  }
  .course-list {
    margin-top: 16px;
  }
  .course-item {
    position: relative;
    margin-bottom: 14px;
    background: #fff;
    text-align: left;
    padding: 14px 16px;
    .title {
      font-weight: 500;
      font-size: 16px;
    }
    .tag {
      // position: absolute;
      // right: 0;
      // top: 0;
      float: right;
      font-style: normal;
      font-size: 11px;
      padding: 3px 6px;
      border-radius: 0 0 0 6px;
    }
    .course {
      background: @red;
    }
    .live {
      background: @blue;
    }
    .homework {
      background: @green;
    }
    .exam {
      background: @orange;
    }
    .bottom {
      margin-top: 6px;
      line-height: 22px;
    }
  }
}
</style>
